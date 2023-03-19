"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const access_jwt_strategy_1 = require("./strategies/access.jwt.strategy");
const local_strategy_1 = require("./strategies/local.strategy");
const users_module_1 = require("../users/users.module");
const auth_service_1 = require("./auth-service");
const mongoose_1 = require("@nestjs/mongoose");
const token_schema_1 = require("../tokens/token.schema");
const devices_schema_1 = require("../devices/devices.schema");
const email_adapter_1 = require("../../adapters/email.adapter");
const refresh_jwt_strategy_1 = require("./strategies/refresh.jwt.strategy");
const devices_module_1 = require("../devices/devices.module");
const auth_controller_1 = require("./auth.controller");
const attempts_module_1 = require("../attempts/attempts.module");
const token_module_1 = require("../tokens/token.module");
const bans_repository_1 = require("../bans/bans.repository");
const bans_schema_1 = require("../bans/application/domain/bans.schema");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: token_schema_1.Token.name, schema: token_schema_1.TokenSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: devices_schema_1.Device.name, schema: devices_schema_1.DeviceSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: bans_schema_1.Ban.name, schema: bans_schema_1.BanSchema }]),
            users_module_1.UsersModule,
            passport_1.PassportModule,
            devices_module_1.DevicesModule,
            attempts_module_1.AttemptsModule,
            token_module_1.TokensModule,
            jwt_1.JwtModule.register({}),
        ],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            access_jwt_strategy_1.AccessJwtStrategy,
            refresh_jwt_strategy_1.RefreshJwtStrategy,
            email_adapter_1.EmailAdapter,
            bans_repository_1.BansRepository,
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService, email_adapter_1.EmailAdapter],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map