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
exports.CommentViewModel = exports.LikeInputModel = exports.CreateCommentModel = exports.CommentSchema = exports.Comment = exports.CommentatorModel = exports.LikesInfo = exports.LikingUsers = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const like_status_decorator_1 = require("../../shared/decorators/validation/like-status.decorator");
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
let LikesInfo = class LikesInfo {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], LikesInfo.prototype, "likesCount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], LikesInfo.prototype, "dislikesCount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LikesInfo.prototype, "myStatus", void 0);
LikesInfo = __decorate([
    (0, mongoose_1.Schema)()
], LikesInfo);
exports.LikesInfo = LikesInfo;
let CommentatorModel = class CommentatorModel {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CommentatorModel.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CommentatorModel.prototype, "userLogin", void 0);
CommentatorModel = __decorate([
    (0, mongoose_1.Schema)()
], CommentatorModel);
exports.CommentatorModel = CommentatorModel;
let Comment = class Comment {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Comment.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", CommentatorModel)
], Comment.prototype, "commentatorInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Comment.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Comment.prototype, "likingUsers", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Comment.prototype, "postId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", LikesInfo)
], Comment.prototype, "likesInfo", void 0);
Comment = __decorate([
    (0, mongoose_1.Schema)()
], Comment);
exports.Comment = Comment;
exports.CommentSchema = mongoose_1.SchemaFactory.createForClass(Comment);
class CreateCommentModel {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(20, 300),
    (0, class_transformer_1.Transform)(({ value }) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value.trim) === null || _a === void 0 ? void 0 : _a.call(value); }),
    __metadata("design:type", String)
], CreateCommentModel.prototype, "content", void 0);
exports.CreateCommentModel = CreateCommentModel;
class LikeInputModel {
}
__decorate([
    (0, like_status_decorator_1.IsLikeStatusCorrect)(),
    __metadata("design:type", String)
], LikeInputModel.prototype, "likeStatus", void 0);
exports.LikeInputModel = LikeInputModel;
class CommentViewModel {
    constructor(id, content, commentatorInfo, createdAt, likesInfo) {
        this.id = id;
        this.content = content;
        this.commentatorInfo = commentatorInfo;
        this.createdAt = createdAt;
        this.likesInfo = likesInfo;
    }
}
exports.CommentViewModel = CommentViewModel;
//# sourceMappingURL=comments.schema.js.map