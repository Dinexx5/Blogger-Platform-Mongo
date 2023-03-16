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
exports.PostsLikesRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const posts_like_schema_1 = require("./posts.like.schema");
const bans_repository_1 = require("../bans/bans.repository");
let PostsLikesRepository = class PostsLikesRepository {
    constructor(bansRepository, postLikeModel) {
        this.bansRepository = bansRepository;
        this.postLikeModel = postLikeModel;
    }
    async findLikeByPostIdAndUserId(postId, userId) {
        return this.postLikeModel.findOne({ $and: [{ postId: postId }, { userId: userId }] });
    }
    async findLikesForPost(postId) {
        const bannedUsers = await this.bansRepository.getBannedUsers();
        return this.postLikeModel.find({ postId: postId, userId: { $nin: bannedUsers } });
    }
    async findThreeLatestLikes(postId) {
        const bannedUsers = await this.bansRepository.getBannedUsers();
        const allLikes = await this.postLikeModel
            .find({ postId: postId, userId: { $nin: bannedUsers } })
            .sort({ createdAt: -1 })
            .lean();
        const threeLatestLikes = allLikes.slice(0, 3);
        const mappedThreeLatestLikes = threeLatestLikes.map((like) => {
            return {
                addedAt: like.createdAt,
                userId: like.userId,
                login: like.login,
            };
        });
        return mappedThreeLatestLikes;
    }
    async save(instance) {
        instance.save();
    }
};
PostsLikesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(posts_like_schema_1.PostLike.name)),
    __metadata("design:paramtypes", [bans_repository_1.BansRepository,
        mongoose_2.Model])
], PostsLikesRepository);
exports.PostsLikesRepository = PostsLikesRepository;
//# sourceMappingURL=posts.likes.repository.js.map