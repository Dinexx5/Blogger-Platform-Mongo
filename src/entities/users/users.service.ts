import { Injectable } from '@nestjs/common';
import { InjectModel, Prop } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { UsersRepository } from './users.repository';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { CreateUserModel, NewPasswordModel, userViewModel } from './userModels';

@Injectable()
export class UsersService {
  constructor(
    protected usersRepository: UsersRepository,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(inputModel: CreateUserModel): Promise<userViewModel> {
    const passwordHash = await this.generateHash(inputModel.password);
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
        isConfirmed: true,
      },
      passwordRecovery: {
        recoveryCode: null,
        expirationDate: null,
      },
      banInfo: { isBanned: false, banDate: 'None', banReason: 'None' },
    };
    const userInstance = await this.saveUser(userDTO);
    return {
      id: userInstance._id.toString(),
      login: userInstance.accountData.login,
      email: userInstance.accountData.email,
      createdAt: userInstance.accountData.createdAt,
    };
  }
  async deleteUserById(userId: string): Promise<boolean> {
    const userInstance = await this.usersRepository.findUserById(userId);
    if (!userInstance) return false;
    await userInstance.deleteOne();
    return true;
  }
  async findUserByLoginOrEmail(login: string): Promise<UserDocument | null> {
    const userInstance = await this.usersRepository.findUserByLoginOrEmail(login);
    if (!userInstance) return null;
    return userInstance;
  }
  async generateHash(password: string) {
    const passwordSalt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, passwordSalt);
  }
  async saveUser(userDTO: any) {
    const userInstance: UserDocument = new this.userModel(userDTO);
    await this.usersRepository.save(userInstance);
    return userInstance;
  }
  async updateCode(email: string, code: string) {
    const userInstance: UserDocument = await this.usersRepository.findUserByLoginOrEmail(email);
    if (!userInstance) return false;
    userInstance.emailConfirmation.confirmationCode = code;
    await this.usersRepository.save(userInstance);
    return true;
  }
  async updateConfirmation(code: string) {
    const userInstance = await this.usersRepository.findUserByConfirmationCode(code);
    if (!userInstance) return false;
    userInstance.emailConfirmation.isConfirmed = true;
    await this.usersRepository.save(userInstance);
    return true;
  }
  async updateRecoveryCode(email: string, confirmationCode: string) {
    const userInstance: UserDocument = await this.usersRepository.findUserByLoginOrEmail(email);
    if (!userInstance) return false;
    const expirationDate = add(new Date(), { hours: 1 });
    userInstance.passwordRecovery.recoveryCode = confirmationCode;
    userInstance.passwordRecovery.expirationDate = expirationDate;
    await this.usersRepository.save(userInstance);
    return true;
  }
  async updatePassword(inputModel: NewPasswordModel): Promise<boolean> {
    const userInstance = await this.usersRepository.findUserByRecoveryCode(inputModel.recoveryCode);
    if (!userInstance) return false;
    const newPasswordHash = await this.generateHash(inputModel.newPassword);
    userInstance.accountData.passwordHash = newPasswordHash;
    await this.usersRepository.save(userInstance);
    return true;
  }
}
