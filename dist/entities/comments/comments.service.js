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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const comments_schema_1 = require("./comments.schema");
const comments_repository_1 = require("./comments.repository");
const users_repository_1 = require("../users/users.repository");
const comments_like_schema_1 = require("../likes/comments.like.schema");
const comments_likes_repository_1 = require("../likes/comments.likes.repository");
const posts_repository_1 = require("../posts/posts.repository");
let CommentsService = class CommentsService {
    constructor(commentsRepository, postsRepository, usersRepository, commentsLikesRepository, commentModel, commentLikeModel) {
        this.commentsRepository = commentsRepository;
        this.postsRepository = postsRepository;
        this.usersRepository = usersRepository;
        this.commentsLikesRepository = commentsLikesRepository;
        this.commentModel = commentModel;
        this.commentLikeModel = commentLikeModel;
        this.filter = { status: '204' };
    }
    async createComment(postId, inputModel, userId) {
        const userInstance = await this.usersRepository.findUserById(userId);
        const postInstance = await this.postsRepository.findPostInstance(postId);
        const commentDTO = {
            _id: new mongoose_2.default.Types.ObjectId(),
            content: inputModel.content,
            commentatorInfo: {
                userId: userInstance._id.toString(),
                userLogin: userInstance.accountData.login,
            },
            createdAt: new Date().toISOString(),
            postInfo: {
                id: postId,
                title: postInstance.title,
                blogId: postInstance.blogId,
                blogName: postInstance.blogName,
            },
            likesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: 'None',
            },
        };
        const commentInstance = new this.commentModel(commentDTO);
        await this.commentsRepository.save(commentInstance);
        return {
            id: commentInstance._id.toString(),
            content: commentInstance.content,
            commentatorInfo: {
                userId: commentInstance.commentatorInfo.userId,
                userLogin: commentInstance.commentatorInfo.userLogin,
            },
            createdAt: commentInstance.createdAt,
            likesInfo: {
                likesCount: commentInstance.likesInfo.likesCount,
                dislikesCount: commentInstance.likesInfo.dislikesCount,
                myStatus: 'None',
            },
        };
    }
    async updateCommentById(commentId, inputModel, userId) {
        const commentInstance = await this.commentsRepository.findComment(commentId);
        if (!commentInstance) {
            this.filter.status = '404';
            return this.filter.status;
        }
        if (commentInstance.commentatorInfo.userId !== userId) {
            this.filter.status = '403';
            return this.filter.status;
        }
        commentInstance.content = inputModel.content;
        await this.commentsRepository.save(commentInstance);
        this.filter.status = '204';
        return this.filter.status;
    }
    async deleteCommentById(commentId, userId) {
        const commentInstance = await this.commentsRepository.findComment(commentId);
        if (!commentInstance) {
            this.filter.status = '404';
            return this.filter.status;
        }
        if (commentInstance.commentatorInfo.userId !== userId) {
            this.filter.status = '403';
            return this.filter.status;
        }
        await commentInstance.deleteOne();
        this.filter.status = '204';
        return this.filter.status;
    }
    async likeComment(commentId, likeStatus, userId) {
        const commentInstance = await this.commentsRepository.findComment(commentId);
        if (!commentInstance) {
            return false;
        }
        const likeInstance = await this.commentsLikesRepository.findLikeByCommentIdAndUserId(commentId, userId);
        if (!likeInstance) {
            const likeDto = {
                commentId,
                likeStatus,
                userId,
                createdAt: new Date().toISOString(),
            };
            const newLikeInstance = new this.commentLikeModel(likeDto);
            await this.commentsLikesRepository.save(newLikeInstance);
            return true;
        }
        likeInstance.likeStatus = likeStatus;
        await this.commentsLikesRepository.save(likeInstance);
        return true;
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __param(5, (0, mongoose_1.InjectModel)(comments_like_schema_1.CommentLike.name)),
    __metadata("design:paramtypes", [comments_repository_1.CommentsRepository,
        posts_repository_1.PostsRepository,
        users_repository_1.UsersRepository,
        comments_likes_repository_1.CommentsLikesRepository,
        mongoose_2.Model,
        mongoose_2.Model])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map