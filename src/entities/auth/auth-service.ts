import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Token, TokenDocument } from '../tokens/token.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TokenRepository } from '../tokens/token.repository';
import { DevicesService } from '../devices/devices.service';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { EmailAdapter } from '../../adapters/email.adapter';
import { Device, DeviceDocument } from '../devices/devices.schema';
import { DevicesRepository } from '../devices/devices.repository';
import { CreateUserModel, NewPasswordModel } from '../users/userModels';
import * as bcrypt from 'bcrypt';
import { BansRepository } from '../bans/bans.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly emailAdapter: EmailAdapter,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    protected tokenRepository: TokenRepository,
    protected devicesService: DevicesService,
    protected devicesRepository: DevicesRepository,
    protected bansRepository: BansRepository,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByLoginOrEmail(username);
    if (!user || !user.emailConfirmation.isConfirmed) {
      return null;
    }
    const isBanned = await this.bansRepository.findBanByUserId(user._id.toString());
    if (isBanned) return null;
    const isValidPassword = await bcrypt.compare(password, user.accountData.passwordHash);
    if (!isValidPassword) return null;
    return user._id;
  }

  async createJwtAccessToken(userId: mongoose.Types.ObjectId) {
    const payload = { userId: userId.toString() };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_SECRET,
      expiresIn: '10000s',
    });
    return accessToken;
  }
  async createJwtRefreshToken(
    userId: mongoose.Schema.Types.ObjectId,
    deviceName: string,
    ip: string,
  ) {
    const deviceId = new Date().toISOString();
    const payload = { userId: userId.toString(), deviceId: deviceId };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '10000s',
    });
    const result = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_SECRET,
    });
    const issuedAt = new Date(result.iat * 1000).toISOString();
    const expiredAt = new Date(result.exp * 1000).toISOString();
    const tokenMetaDTO = {
      _id: new mongoose.Types.ObjectId(),
      issuedAt: issuedAt,
      userId: userId,
      deviceId: deviceId,
      deviceName: deviceName,
      ip: ip,
      expiredAt: expiredAt,
    };
    const tokenInstance = new this.tokenModel(tokenMetaDTO);
    await this.tokenRepository.save(tokenInstance);
    await this.devicesService.createDevice(userId, ip, deviceName, deviceId, issuedAt);
    return refreshToken;
  }
  async updateJwtRefreshToken(deviceId: string, exp: number, userId: mongoose.Types.ObjectId) {
    const previousExpirationDate = new Date(exp * 1000).toISOString();
    const tokenInstance: TokenDocument = await this.tokenRepository.findToken(
      previousExpirationDate,
    );
    const newPayload = { userId: userId, deviceId: deviceId };
    const newRefreshToken = this.jwtService.sign(newPayload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '10000s',
    });
    const newResult: any = await this.getRefreshTokenInfo(newRefreshToken);
    const newIssuedAt = new Date(newResult.iat * 1000).toISOString();
    const newExpiredAt = new Date(newResult.exp * 1000).toISOString();
    tokenInstance.expiredAt = newExpiredAt;
    tokenInstance.issuedAt = newIssuedAt;
    await this.tokenRepository.save(tokenInstance);
    const deviceInstance = await this.devicesRepository.findSessionByDeviceId(deviceId);
    deviceInstance.lastActiveDate = newIssuedAt;
    await this.devicesRepository.save(deviceInstance);
    return newRefreshToken;
  }
  async getRefreshTokenInfo(token: string) {
    try {
      const result: any = this.jwtService.verify(token, { secret: process.env.REFRESH_SECRET });
      return result;
    } catch (error) {
      return null;
    }
  }
  async getAccessTokenInfo(token: string) {
    try {
      const result: any = this.jwtService.verify(token, { secret: process.env.ACCESS_SECRET });
      return result;
    } catch (error) {
      return null;
    }
  }
  async deleteCurrentToken(token: string) {
    const result: any = await this.getRefreshTokenInfo(token);
    if (!result) throw new UnauthorizedException();
    const expirationDate = new Date(result.exp * 1000).toISOString();
    const tokenInstance: TokenDocument = await this.tokenRepository.findToken(expirationDate);
    if (!tokenInstance) throw new UnauthorizedException();
    await tokenInstance.deleteOne();
  }
  async deleteDeviceForLogout(token: string) {
    const result: any = await this.getRefreshTokenInfo(token);
    const deviceId = result.deviceId;
    const deviceInstance = await this.devicesRepository.findDeviceById(deviceId);
    await deviceInstance.deleteOne();
  }
  async createUser(inputModel: CreateUserModel) {
    const passwordHash = await this.usersService.generateHash(inputModel.password);
    const userDTO = {
      _id: new mongoose.Types.ObjectId(),
      accountData: {
        login: inputModel.login,
        passwordHash: passwordHash,
        email: inputModel.email,
        createdAt: new Date().toISOString(),
      },
      emailConfirmation: {
        confirmationCode: uuidv4(),
        expirationDate: add(new Date(), {
          hours: 1,
        }),
        isConfirmed: false,
      },
      passwordRecovery: {
        recoveryCode: null,
        expirationDate: null,
      },
      banInfo: { isBanned: false, banDate: 'None', banReason: 'None' },
    };
    const userInstance = await this.usersService.saveUser(userDTO);
    try {
      await this.emailAdapter.sendEmailForConfirmation(
        inputModel.email,
        userInstance.emailConfirmation.confirmationCode,
      );
    } catch (error) {
      console.error(error);
      return null;
    }
    return userInstance;
  }
  async resendEmail(email: string): Promise<boolean> {
    const confirmationCode = uuidv4();
    try {
      await this.emailAdapter.sendEmailForConfirmation(email, confirmationCode);
    } catch (error) {
      console.error(error);
      return false;
    }
    const isUpdated = await this.usersService.updateCode(email, confirmationCode);
    if (!isUpdated) return false;
    return true;
  }
  async confirmEmail(code: string): Promise<boolean> {
    const isConfirmed = await this.usersService.updateConfirmation(code);
    if (!isConfirmed) return false;
    return true;
  }
  async sendEmailForPasswordRecovery(email: string): Promise<boolean> {
    const confirmationCode = uuidv4();
    const isUpdated = await this.usersService.updateRecoveryCode(email, confirmationCode);
    if (!isUpdated) return false;
    try {
      await this.emailAdapter.sendEmailForPasswordRecovery(email, confirmationCode);
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
  async updatePassword(inputModel: NewPasswordModel): Promise<boolean> {
    const isUpdated = await this.usersService.updatePassword(inputModel);
    if (!isUpdated) return false;
    return true;
  }
}
