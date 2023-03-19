"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BansModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const ban_user_use_case_1 = require("./application/use-cases/ban.user.use.case.");
const bans_schema_1 = require("./application/domain/bans.schema");
const bans_repository_1 = require("../bans/bans.repository");
const bans_controller_1 = require("./bans.controller");
const users_module_1 = require("../users/users.module");
const auth_module_1 = require("../auth/auth.module");
const blogs_module_1 = require("../blogs/blogs.module");
const token_module_1 = require("../tokens/token.module");
const devices_module_1 = require("../devices/devices.module");
const posts_module_1 = require("../posts/posts.module");
const comments_module_1 = require("../comments/comments.module");
const users_schema_1 = require("../users/users.schema");
const cqrs_1 = require("@nestjs/cqrs");
let BansModule = class BansModule {
};
BansModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            blogs_module_1.BlogsModule,
            posts_module_1.PostsModule,
            comments_module_1.CommentsModule,
            token_module_1.TokensModule,
            devices_module_1.DevicesModule,
            mongoose_1.MongooseModule.forFeature([{ name: bans_schema_1.Ban.name, schema: bans_schema_1.BanSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }]),
        ],
        providers: [ban_user_use_case_1.BansUserUseCase, bans_repository_1.BansRepository],
        controllers: [bans_controller_1.BansController],
        exports: [ban_user_use_case_1.BansUserUseCase, bans_repository_1.BansRepository],
    })
], BansModule);
exports.BansModule = BansModule;
//# sourceMappingURL=bans.module.js.map