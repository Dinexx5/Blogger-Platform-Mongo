"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blogs_schema_1 = require("../blogs/domain/blogs.schema");
const mongoose_2 = require("mongoose");
const posts_schema_1 = require("../posts/posts.schema");
const users_schema_1 = require("../users/users.schema");
const comments_schema_1 = require("../comments/comments.schema");
const attempts_schema_1 = require("../attempts/attempts.schema");
const token_schema_1 = require("../tokens/token.schema");
const devices_schema_1 = require("../devices/devices.schema");
const bans_schema_1 = require("../bans/application/domain/bans.schema");
const posts_like_schema_1 = require("../likes/posts.like.schema");
const comments_like_schema_1 = require("../likes/comments.like.schema");
let TestingController = class TestingController {
    constructor(blogModel, postModel, userModel, commentModel, attemptModel, tokenModel, deviceModel, banModel, postLikeModel, commentLikeModel, blogBanModel, banUserForBlogModel) {
        this.blogModel = blogModel;
        this.postModel = postModel;
        this.userModel = userModel;
        this.commentModel = commentModel;
        this.attemptModel = attemptModel;
        this.tokenModel = tokenModel;
        this.deviceModel = deviceModel;
        this.banModel = banModel;
        this.postLikeModel = postLikeModel;
        this.commentLikeModel = commentLikeModel;
        this.blogBanModel = blogBanModel;
        this.banUserForBlogModel = banUserForBlogModel;
    }
    async deleteAll(res) {
        await this.blogModel.deleteMany({});
        await this.postModel.deleteMany({});
        await this.userModel.deleteMany({});
        await this.commentModel.deleteMany({});
        await this.attemptModel.deleteMany({});
        await this.tokenModel.deleteMany({});
        await this.deviceModel.deleteMany({});
        await this.banModel.deleteMany({});
        await this.postLikeModel.deleteMany({});
        await this.commentLikeModel.deleteMany({});
        await this.blogBanModel.deleteMany({});
        await this.banUserForBlogModel.deleteMany({});
        return res.sendStatus(204);
    }
};
__decorate([
    (0, common_1.Delete)('all-data'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestingController.prototype, "deleteAll", null);
TestingController = __decorate([
    (0, common_1.Controller)('testing'),
    __param(0, (0, mongoose_1.InjectModel)(blogs_schema_1.Blog.name)),
    __param(1, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __param(2, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __param(3, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __param(4, (0, mongoose_1.InjectModel)(attempts_schema_1.Attempt.name)),
    __param(5, (0, mongoose_1.InjectModel)(token_schema_1.Token.name)),
    __param(6, (0, mongoose_1.InjectModel)(devices_schema_1.Device.name)),
    __param(7, (0, mongoose_1.InjectModel)(bans_schema_1.Ban.name)),
    __param(8, (0, mongoose_1.InjectModel)(posts_like_schema_1.PostLike.name)),
    __param(9, (0, mongoose_1.InjectModel)(comments_like_schema_1.CommentLike.name)),
    __param(10, (0, mongoose_1.InjectModel)(bans_schema_1.BlogBan.name)),
    __param(11, (0, mongoose_1.InjectModel)(bans_schema_1.UserForBlogBan.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TestingController);
exports.TestingController = TestingController;
//# sourceMappingURL=testing.controller.js.map