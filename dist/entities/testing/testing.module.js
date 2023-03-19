"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingModule = void 0;
const common_1 = require("@nestjs/common");
const testing_controller_1 = require("./testing.controller");
const mongoose_1 = require("@nestjs/mongoose");
const blogs_schema_1 = require("../blogs/domain/blogs.schema");
const posts_schema_1 = require("../posts/posts.schema");
const comments_schema_1 = require("../comments/comments.schema");
const users_schema_1 = require("../users/users.schema");
const attempts_schema_1 = require("../attempts/attempts.schema");
const token_schema_1 = require("../tokens/token.schema");
const devices_schema_1 = require("../devices/devices.schema");
const bans_schema_1 = require("../bans/application/domain/bans.schema");
const comments_like_schema_1 = require("../likes/comments.like.schema");
const posts_like_schema_1 = require("../likes/posts.like.schema");
let TestingModule = class TestingModule {
};
TestingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: blogs_schema_1.Blog.name, schema: blogs_schema_1.BlogSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: posts_schema_1.Post.name, schema: posts_schema_1.PostSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: comments_schema_1.Comment.name, schema: comments_schema_1.CommentSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: attempts_schema_1.Attempt.name, schema: attempts_schema_1.AttemptSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: token_schema_1.Token.name, schema: token_schema_1.TokenSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: devices_schema_1.Device.name, schema: devices_schema_1.DeviceSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: bans_schema_1.Ban.name, schema: bans_schema_1.BanSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: comments_like_schema_1.CommentLike.name, schema: comments_like_schema_1.CommentLikeSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: posts_like_schema_1.PostLike.name, schema: posts_like_schema_1.PostLikeSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: bans_schema_1.BlogBan.name, schema: bans_schema_1.BlogBanSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: bans_schema_1.UserForBlogBan.name, schema: bans_schema_1.BanUserForBlogSchema }]),
        ],
        providers: [],
        controllers: [testing_controller_1.TestingController],
        exports: [],
    })
], TestingModule);
exports.TestingModule = TestingModule;
//# sourceMappingURL=testing.module.js.map