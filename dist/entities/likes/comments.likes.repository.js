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
exports.CommentsLikesRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comments_like_schema_1 = require("./comments.like.schema");
const bans_repository_1 = require("../bans/bans.repository");
let CommentsLikesRepository = class CommentsLikesRepository {
    constructor(bansRepository, commentLikeModel) {
        this.bansRepository = bansRepository;
        this.commentLikeModel = commentLikeModel;
    }
    async findLikeByCommentIdAndUserId(commentId, userId) {
        return this.commentLikeModel.findOne({ $and: [{ commentId: commentId }, { userId: userId }] });
    }
    async findLikesForComment(commentId) {
        const bannedUsers = await this.bansRepository.getBannedUsers();
        return this.commentLikeModel.find({ commentId: commentId, userId: { $nin: bannedUsers } });
    }
    async save(instance) {
        instance.save();
    }
};
CommentsLikesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(comments_like_schema_1.CommentLike.name)),
    __metadata("design:paramtypes", [bans_repository_1.BansRepository,
        mongoose_2.Model])
], CommentsLikesRepository);
exports.CommentsLikesRepository = CommentsLikesRepository;
//# sourceMappingURL=comments.likes.repository.js.map