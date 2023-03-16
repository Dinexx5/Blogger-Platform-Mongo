"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const token_schema_1 = require("../tokens/token.schema");
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_2 = require("@nestjs/mongoose");
const token_repository_1 = require("../tokens/token.repository");
const devices_service_1 = require("../devices/devices.service");
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
const email_adapter_1 = require("../../adapters/email.adapter");
const devices_schema_1 = require("../devices/devices.schema");
const devices_repository_1 = require("../devices/devices.repository");
const bcrypt = __importStar(require("bcrypt"));
const bans_repository_1 = require("../bans/bans.repository");
let AuthService = class AuthService {
    constructor(emailAdapter, usersService, jwtService, tokenRepository, devicesService, devicesRepository, bansRepository, tokenModel, deviceModel) {
        this.emailAdapter = emailAdapter;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.devicesService = devicesService;
        this.devicesRepository = devicesRepository;
        this.bansRepository = bansRepository;
        this.tokenModel = tokenModel;
        this.deviceModel = deviceModel;
    }
    async validateUser(username, password) {
        const user = await this.usersService.findUserByLoginOrEmail(username);
        if (!user || !user.emailConfirmation.isConfirmed) {
            return null;
        }
        const isBanned = await this.bansRepository.findBanByUserId(user._id.toString());
        if (isBanned)
            return null;
        const isValidPassword = await bcrypt.compare(password, user.accountData.passwordHash);
        if (!isValidPassword)
            return null;
        return user._id;
    }
    async createJwtAccessToken(userId) {
        const payload = { userId: userId.toString() };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.ACCESS_SECRET,
            expiresIn: '10000s',
        });
        return accessToken;
    }
    async createJwtRefreshToken(userId, deviceName, ip) {
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
            _id: new mongoose_1.default.Types.ObjectId(),
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
    async updateJwtRefreshToken(deviceId, exp, userId) {
        const previousExpirationDate = new Date(exp * 1000).toISOString();
        const tokenInstance = await this.tokenRepository.findToken(previousExpirationDate);
        const newPayload = { userId: userId, deviceId: deviceId };
        const newRefreshToken = this.jwtService.sign(newPayload, {
            secret: process.env.REFRESH_SECRET,
            expiresIn: '10000s',
        });
        const newResult = await this.getRefreshTokenInfo(newRefreshToken);
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
    async getRefreshTokenInfo(token) {
        try {
            const result = this.jwtService.verify(token, { secret: process.env.REFRESH_SECRET });
            return result;
        }
        catch (error) {
            return null;
        }
    }
    async getAccessTokenInfo(token) {
        try {
            const result = this.jwtService.verify(token, { secret: process.env.ACCESS_SECRET });
            return result;
        }
        catch (error) {
            return null;
        }
    }
    async deleteCurrentToken(token) {
        const result = await this.getRefreshTokenInfo(token);
        if (!result)
            throw new common_1.UnauthorizedException();
        const expirationDate = new Date(result.exp * 1000).toISOString();
        const tokenInstance = await this.tokenRepository.findToken(expirationDate);
        if (!tokenInstance)
            throw new common_1.UnauthorizedException();
        await tokenInstance.deleteOne();
    }
    async deleteDeviceForLogout(token) {
        const result = await this.getRefreshTokenInfo(token);
        const deviceId = result.deviceId;
        const deviceInstance = await this.devicesRepository.findDeviceById(deviceId);
        await deviceInstance.deleteOne();
    }
    async createUser(inputModel) {
        const passwordHash = await this.usersService.generateHash(inputModel.password);
        const userDTO = {
            _id: new mongoose_1.default.Types.ObjectId(),
            accountData: {
                login: inputModel.login,
                passwordHash: passwordHash,
                email: inputModel.email,
                createdAt: new Date().toISOString(),
            },
            emailConfirmation: {
                confirmationCode: (0, uuid_1.v4)(),
                expirationDate: (0, date_fns_1.add)(new Date(), {
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
            await this.emailAdapter.sendEmailForConfirmation(inputModel.email, userInstance.emailConfirmation.confirmationCode);
        }
        catch (error) {
            console.error(error);
            return null;
        }
        return userInstance;
    }
    async resendEmail(email) {
        const confirmationCode = (0, uuid_1.v4)();
        try {
            await this.emailAdapter.sendEmailForConfirmation(email, confirmationCode);
        }
        catch (error) {
            console.error(error);
            return false;
        }
        const isUpdated = await this.usersService.updateCode(email, confirmationCode);
        if (!isUpdated)
            return false;
        return true;
    }
    async confirmEmail(code) {
        const isConfirmed = await this.usersService.updateConfirmation(code);
        if (!isConfirmed)
            return false;
        return true;
    }
    async sendEmailForPasswordRecovery(email) {
        const confirmationCode = (0, uuid_1.v4)();
        const isUpdated = await this.usersService.updateRecoveryCode(email, confirmationCode);
        if (!isUpdated)
            return false;
        try {
            await this.emailAdapter.sendEmailForPasswordRecovery(email, confirmationCode);
        }
        catch (error) {
            console.error(error);
            return false;
        }
        return true;
    }
    async updatePassword(inputModel) {
        const isUpdated = await this.usersService.updatePassword(inputModel);
        if (!isUpdated)
            return false;
        return true;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(7, (0, mongoose_2.InjectModel)(token_schema_1.Token.name)),
    __param(8, (0, mongoose_2.InjectModel)(devices_schema_1.Device.name)),
    __metadata("design:paramtypes", [email_adapter_1.EmailAdapter,
        users_service_1.UsersService,
        jwt_1.JwtService,
        token_repository_1.TokenRepository,
        devices_service_1.DevicesService,
        devices_repository_1.DevicesRepository,
        bans_repository_1.BansRepository,
        mongoose_1.Model,
        mongoose_1.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth-service.js.map