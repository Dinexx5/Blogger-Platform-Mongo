"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_repository_1 = require("./users.repository");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./users.schema");
const users_query_repo_1 = require("./users.query-repo");
const sa_users_controller_1 = require("./sa.users.controller");
const login_exists_decorator_1 = require("../../shared/decorators/validation/login-exists.decorator");
const email_exists_decorator_1 = require("../../shared/decorators/validation/email-exists.decorator");
const confirm_email_decorator_1 = require("../../shared/decorators/validation/confirm-email.decorator");
const email_resending_decorator_1 = require("../../shared/decorators/validation/email-resending.decorator");
const password_recovery_decorator_1 = require("../../shared/decorators/validation/password-recovery.decorator");
const user_exists_decorator_1 = require("../../shared/decorators/validation/user-exists.decorator");
const bans_schema_1 = require("../bans/application/domain/bans.schema");
const devices_repository_1 = require("../devices/devices.repository");
const devices_schema_1 = require("../devices/devices.schema");
const token_repository_1 = require("../tokens/token.repository");
const token_schema_1 = require("../tokens/token.schema");
const sa_users_query_repo_1 = require("./sa.users.query-repo");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: bans_schema_1.Ban.name, schema: bans_schema_1.BanSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: devices_schema_1.Device.name, schema: devices_schema_1.DeviceSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: token_schema_1.Token.name, schema: token_schema_1.TokenSchema }]),
        ],
        providers: [
            users_service_1.UsersService,
            users_repository_1.UsersRepository,
            users_query_repo_1.UsersQueryRepository,
            sa_users_query_repo_1.SaUsersQueryRepository,
            login_exists_decorator_1.IsLoginExistsDecorator,
            email_exists_decorator_1.IsEmailExistsDecorator,
            confirm_email_decorator_1.IsConfirmationCodeCorrect,
            email_resending_decorator_1.EmailResendingDecorator,
            password_recovery_decorator_1.IsRecoveryCodeCorrect,
            user_exists_decorator_1.IsUserExistsDecorator,
            devices_repository_1.DevicesRepository,
            token_repository_1.TokenRepository,
        ],
        controllers: [sa_users_controller_1.UsersSAController],
        exports: [users_service_1.UsersService, users_repository_1.UsersRepository, users_query_repo_1.UsersQueryRepository, sa_users_query_repo_1.SaUsersQueryRepository],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map