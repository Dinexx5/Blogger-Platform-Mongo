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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostViewModel = exports.updatePostModel = exports.createPostModel = exports.PostSchema = exports.Post = exports.LikeModel = exports.ExtendedLikesInfo = exports.newestLikes = exports.LikingUsers = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let LikingUsers = class LikingUsers {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LikingUsers.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LikingUsers.prototype, "myStatus", void 0);
LikingUsers = __decorate([
    (0, mongoose_1.Schema)()
], LikingUsers);
exports.LikingUsers = LikingUsers;
let newestLikes = class newestLikes {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], newestLikes.prototype, "addedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], newestLikes.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], newestLikes.prototype, "login", void 0);
newestLikes = __decorate([
    (0, mongoose_1.Schema)()
], newestLikes);
exports.newestLikes = newestLikes;
let ExtendedLikesInfo = class ExtendedLikesInfo {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ExtendedLikesInfo.prototype, "likesCount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ExtendedLikesInfo.prototype, "dislikesCount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ExtendedLikesInfo.prototype, "myStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], ExtendedLikesInfo.prototype, "newestLikes", void 0);
ExtendedLikesInfo = __decorate([
    (0, mongoose_1.Schema)()
], ExtendedLikesInfo);
exports.ExtendedLikesInfo = ExtendedLikesInfo;
let LikeModel = class LikeModel {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LikeModel.prototype, "addedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LikeModel.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LikeModel.prototype, "login", void 0);
LikeModel = __decorate([
    (0, mongoose_1.Schema)()
], LikeModel);
exports.LikeModel = LikeModel;
let Post = class Post {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Post.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "shortDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "blogId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "blogName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Post.prototype, "likingUsers", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Post.prototype, "likes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", ExtendedLikesInfo)
], Post.prototype, "extendedLikesInfo", void 0);
Post = __decorate([
    (0, mongoose_1.Schema)()
], Post);
exports.Post = Post;
exports.PostSchema = mongoose_1.SchemaFactory.createForClass(Post);
class createPostModel {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(0, 30),
    (0, class_transformer_1.Transform)(({ value }) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value.trim) === null || _a === void 0 ? void 0 : _a.call(value); }),
    __metadata("design:type", String)
], createPostModel.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(0, 100),
    (0, class_transformer_1.Transform)(({ value }) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value.trim) === null || _a === void 0 ? void 0 : _a.call(value); }),
    __metadata("design:type", String)
], createPostModel.prototype, "shortDescription", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(0, 1000),
    (0, class_transformer_1.Transform)(({ value }) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value.trim) === null || _a === void 0 ? void 0 : _a.call(value); }),
    __metadata("design:type", String)
], createPostModel.prototype, "content", void 0);
exports.createPostModel = createPostModel;
class updatePostModel {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(0, 30),
    (0, class_transformer_1.Transform)(({ value }) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value.trim) === null || _a === void 0 ? void 0 : _a.call(value); }),
    __metadata("design:type", String)
], updatePostModel.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(0, 100),
    (0, class_transformer_1.Transform)(({ value }) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value.trim) === null || _a === void 0 ? void 0 : _a.call(value); }),
    __metadata("design:type", String)
], updatePostModel.prototype, "shortDescription", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(0, 1000),
    (0, class_transformer_1.Transform)(({ value }) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value.trim) === null || _a === void 0 ? void 0 : _a.call(value); }),
    __metadata("design:type", String)
], updatePostModel.prototype, "content", void 0);
exports.updatePostModel = updatePostModel;
class PostViewModel {
    constructor(id, title, shortDescription, content, blogId, blogName, createdAt, extendedLikesInfo) {
        this.id = id;
        this.title = title;
        this.shortDescription = shortDescription;
        this.content = content;
        this.blogId = blogId;
        this.blogName = blogName;
        this.createdAt = createdAt;
        this.extendedLikesInfo = extendedLikesInfo;
    }
}
exports.PostViewModel = PostViewModel;
//# sourceMappingURL=posts.schema.js.map