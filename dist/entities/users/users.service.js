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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const users_schema_1 = require("./users.schema");
const users_repository_1 = require("./users.repository");
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    constructor(usersRepository, userModel) {
        this.usersRepository = usersRepository;
        this.userModel = userModel;
    }
    async createUser(inputModel) {
        const passwordHash = await this.generateHash(inputModel.password);
        const userDTO = {
            _id: new mongoose_2.default.Types.ObjectId(),
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
                isConfirmed: true,
            },
            passwordRecovery: {
                recoveryCode: null,
                expirationDate: null,
            },
            banInfo: { isBanned: false, banDate: null, banReason: null },
        };
        const userInstance = await this.saveUser(userDTO);
        return {
            id: userInstance._id.toString(),
            login: userInstance.accountData.login,
            email: userInstance.accountData.email,
            createdAt: userInstance.accountData.createdAt,
            banInfo: {
                isBanned: userInstance.banInfo.isBanned,
                banDate: userInstance.banInfo.banDate,
                banReason: userInstance.banInfo.banReason,
            },
        };
    }
    async deleteUserById(userId) {
        const userInstance = await this.usersRepository.findUserById(userId);
        if (!userInstance)
            return false;
        await userInstance.deleteOne();
        return true;
    }
    async findUserByLoginOrEmail(login) {
        const userInstance = await this.usersRepository.findUserByLoginOrEmail(login);
        if (!userInstance)
            return null;
        return userInstance;
    }
    async generateHash(password) {
        const passwordSalt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, passwordSalt);
    }
    async saveUser(userDTO) {
        const userInstance = new this.userModel(userDTO);
        await this.usersRepository.save(userInstance);
        return userInstance;
    }
    async updateCode(email, code) {
        const userInstance = await this.usersRepository.findUserByLoginOrEmail(email);
        if (!userInstance)
            return false;
        userInstance.emailConfirmation.confirmationCode = code;
        await this.usersRepository.save(userInstance);
        return true;
    }
    async updateConfirmation(code) {
        const userInstance = await this.usersRepository.findUserByConfirmationCode(code);
        if (!userInstance)
            return false;
        userInstance.emailConfirmation.isConfirmed = true;
        await this.usersRepository.save(userInstance);
        return true;
    }
    async updateRecoveryCode(email, confirmationCode) {
        const userInstance = await this.usersRepository.findUserByLoginOrEmail(email);
        if (!userInstance)
            return false;
        const expirationDate = (0, date_fns_1.add)(new Date(), { hours: 1 });
        userInstance.passwordRecovery.recoveryCode = confirmationCode;
        userInstance.passwordRecovery.expirationDate = expirationDate;
        await this.usersRepository.save(userInstance);
        return true;
    }
    async updatePassword(inputModel) {
        const userInstance = await this.usersRepository.findUserByRecoveryCode(inputModel.recoveryCode);
        if (!userInstance)
            return false;
        const newPasswordHash = await this.generateHash(inputModel.newPassword);
        userInstance.accountData.passwordHash = newPasswordHash;
        await this.usersRepository.save(userInstance);
        return true;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map