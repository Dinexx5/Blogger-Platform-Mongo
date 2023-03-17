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
exports.CommentsQueryRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const comments_schema_1 = require("./comments.schema");
const bans_repository_1 = require("../bans/bans.repository");
const comments_likes_repository_1 = require("../likes/comments.likes.repository");
function mapperToCommentViewModel(comment) {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin,
        },
        createdAt: comment.createdAt,
        likesInfo: {
            likesCount: comment.likesInfo.likesCount,
            dislikesCount: comment.likesInfo.dislikesCount,
            myStatus: comment.likesInfo.myStatus,
        },
    };
}
let CommentsQueryRepository = class CommentsQueryRepository {
    constructor(bansRepository, commentsLikesRepository, commentModel) {
        this.bansRepository = bansRepository;
        this.commentsLikesRepository = commentsLikesRepository;
        this.commentModel = commentModel;
    }
    async getAllCommentsForPost(query, postId, userId) {
        const { sortDirection = 'desc', sortBy = 'createdAt', pageNumber = 1, pageSize = 10 } = query;
        const sortDirectionNumber = sortDirection === 'desc' ? -1 : 1;
        const skippedCommentsNumber = (+pageNumber - 1) * +pageSize;
        const bannedComments = await this.bansRepository.getBannedComments();
        const filter = { postId: postId, _id: { $nin: bannedComments } };
        const countAll = await this.commentModel.countDocuments(filter);
        const commentsDb = await this.commentModel
            .find(filter)
            .sort({ [sortBy]: sortDirectionNumber })
            .skip(skippedCommentsNumber)
            .limit(+pageSize);
        await this.countLikesForComments(commentsDb, userId);
        console.log(commentsDb);
        const commentsView = commentsDb.map(mapperToCommentViewModel);
        return {
            pagesCount: Math.ceil(countAll / +pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: countAll,
            items: commentsView,
        };
    }
    async countLikesForComments(comments, userId) {
        for (const comment of comments) {
            const foundLikes = await this.commentsLikesRepository.findLikesForComment(comment.id.toString());
            if (userId) {
                const likeOfUser = foundLikes.find((like) => like.userId === userId);
                const likeStatus = likeOfUser.likeStatus;
                comment.likesInfo.myStatus = likeStatus;
            }
            const likesCount = foundLikes.filter((like) => like.likeStatus === 'Like').length;
            const dislikesCount = foundLikes.filter((like) => like.likeStatus === 'Dislike').length;
            comment.likesInfo.likesCount = likesCount;
            comment.likesInfo.dislikesCount = dislikesCount;
        }
    }
    async countLikesForComment(comment, userId) {
        const foundLikes = await this.commentsLikesRepository.findLikesForComment(comment.id.toString());
        if (userId) {
            const likeOfUser = foundLikes.find((like) => like.userId === userId);
            const likeStatus = likeOfUser.likeStatus;
            comment.likesInfo.myStatus = likeStatus;
        }
        const likesCount = foundLikes.filter((like) => like.likeStatus === 'Like').length;
        const dislikesCount = foundLikes.filter((like) => like.likeStatus === 'Dislike').length;
        comment.likesInfo.likesCount = likesCount;
        comment.likesInfo.dislikesCount = dislikesCount;
    }
    async findCommentById(commentId, userId) {
        const _id = new mongoose_2.default.Types.ObjectId(commentId);
        const bannedComments = await this.bansRepository.getBannedComments();
        const bannedCommentsStrings = bannedComments.map((commentId) => commentId.toString());
        const foundComment = await this.commentModel.findOne({ _id: _id });
        if (!foundComment) {
            return null;
        }
        if (bannedCommentsStrings.includes(foundComment._id.toString())) {
            return null;
        }
        await this.countLikesForComment(foundComment, userId);
        return mapperToCommentViewModel(foundComment);
    }
};
CommentsQueryRepository = __decorate([
    __param(2, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __metadata("design:paramtypes", [bans_repository_1.BansRepository,
        comments_likes_repository_1.CommentsLikesRepository,
        mongoose_2.Model])
], CommentsQueryRepository);
exports.CommentsQueryRepository = CommentsQueryRepository;
//# sourceMappingURL=comments.query-repo.js.map