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
exports.CommentSchema = exports.Comment = exports.CommentatorModel = exports.PostInfo = exports.LikesInfo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
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
let PostInfo = class PostInfo {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PostInfo.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PostInfo.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PostInfo.prototype, "blogId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PostInfo.prototype, "blogName", void 0);
PostInfo = __decorate([
    (0, mongoose_1.Schema)()
], PostInfo);
exports.PostInfo = PostInfo;
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
    __metadata("design:type", PostInfo)
], Comment.prototype, "postInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", LikesInfo)
], Comment.prototype, "likesInfo", void 0);
Comment = __decorate([
    (0, mongoose_1.Schema)()
], Comment);
exports.Comment = Comment;
exports.CommentSchema = mongoose_1.SchemaFactory.createForClass(Comment);
//# sourceMappingURL=comments.schema.js.map