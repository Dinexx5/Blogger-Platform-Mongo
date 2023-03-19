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
exports.PostsQueryRepository = void 0;
const posts_schema_1 = require("./posts.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const bans_repository_1 = require("../bans/bans.repository");
const posts_likes_repository_1 = require("../likes/posts.likes.repository");
const bans_blogs_repository_1 = require("../bans/bans.blogs.repository");
function mapperToPostViewModel(post) {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt,
        extendedLikesInfo: {
            likesCount: post.extendedLikesInfo.likesCount,
            dislikesCount: post.extendedLikesInfo.dislikesCount,
            myStatus: post.extendedLikesInfo.myStatus,
            newestLikes: post.extendedLikesInfo.newestLikes,
        },
    };
}
let PostsQueryRepository = class PostsQueryRepository {
    constructor(bansRepository, postsLikesRepository, blogBansRepository, postModel) {
        this.bansRepository = bansRepository;
        this.postsLikesRepository = postsLikesRepository;
        this.blogBansRepository = blogBansRepository;
        this.postModel = postModel;
    }
    async getAllPosts(query, blogId, userId) {
        const { sortDirection = 'desc', sortBy = 'createdAt', pageNumber = 1, pageSize = 10 } = query;
        const sortDirectionNumber = sortDirection === 'desc' ? -1 : 1;
        const skippedPostsNumber = (+pageNumber - 1) * +pageSize;
        const bannedPostsFromUsers = await this.bansRepository.getBannedPosts();
        const bannedPosts = await this.blogBansRepository.getBannedPosts();
        const allBannedPosts = bannedPosts.concat(bannedPostsFromUsers);
        const filter = { _id: { $nin: allBannedPosts } };
        if (blogId) {
            filter.blogId = { $regex: blogId };
        }
        const countAll = await this.postModel.countDocuments(filter);
        const postsDb = await this.postModel
            .find(filter)
            .sort({
            [sortBy]: sortDirectionNumber,
            title: sortDirectionNumber,
            id: sortDirectionNumber,
        })
            .skip(skippedPostsNumber)
            .limit(+pageSize);
        await this.countLikesForPosts(postsDb, userId);
        const postsView = postsDb.map(mapperToPostViewModel);
        return {
            pagesCount: Math.ceil(countAll / +pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: countAll,
            items: postsView,
        };
    }
    async countLikesForPosts(posts, userId) {
        for (const post of posts) {
            const foundLikes = await this.postsLikesRepository.findLikesForPost(post.id.toString());
            const threeLatestLikes = await this.postsLikesRepository.findThreeLatestLikes(post.id.toString());
            if (userId) {
                const likeOfUser = foundLikes.find((like) => like.userId === userId);
                const likeStatus = likeOfUser.likeStatus;
                post.extendedLikesInfo.myStatus = likeStatus;
            }
            const likesCount = foundLikes.filter((like) => like.likeStatus === 'Like').length;
            const dislikesCount = foundLikes.filter((like) => like.likeStatus === 'Dislike').length;
            post.extendedLikesInfo.likesCount = likesCount;
            post.extendedLikesInfo.dislikesCount = dislikesCount;
            const newestLikes = [];
            newestLikes.push(...threeLatestLikes);
            post.extendedLikesInfo.newestLikes = newestLikes;
        }
    }
    async countLikesForPost(post, userId) {
        const foundLikes = await this.postsLikesRepository.findLikesForPost(post.id.toString());
        const threeLatestLikes = await this.postsLikesRepository.findThreeLatestLikes(post.id.toString());
        if (userId) {
            const likeOfUser = foundLikes.find((like) => like.userId === userId);
            const likeStatus = likeOfUser.likeStatus;
            post.extendedLikesInfo.myStatus = likeStatus;
        }
        const likesCount = foundLikes.filter((like) => like.likeStatus === 'Like').length;
        const dislikesCount = foundLikes.filter((like) => like.likeStatus === 'Dislike').length;
        post.extendedLikesInfo.likesCount = likesCount;
        post.extendedLikesInfo.dislikesCount = dislikesCount;
        const newestLikes = [];
        newestLikes.push(...threeLatestLikes);
        post.extendedLikesInfo.newestLikes = newestLikes;
    }
    async findPostById(postId, userId) {
        const _id = new mongoose_2.default.Types.ObjectId(postId);
        const bannedPostsFromUsers = await this.bansRepository.getBannedPosts();
        const bannedPosts = await this.blogBansRepository.getBannedPosts();
        const allBannedPosts = bannedPosts.concat(bannedPostsFromUsers);
        const bannedPostsStrings = allBannedPosts.map((postId) => postId.toString());
        const foundPost = await this.postModel.findOne({
            _id: _id,
        });
        if (!foundPost) {
            return null;
        }
        if (bannedPostsStrings.includes(foundPost._id.toString())) {
            return null;
        }
        await this.countLikesForPost(foundPost, userId);
        return mapperToPostViewModel(foundPost);
    }
};
PostsQueryRepository = __decorate([
    __param(3, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __metadata("design:paramtypes", [bans_repository_1.BansRepository,
        posts_likes_repository_1.PostsLikesRepository,
        bans_blogs_repository_1.BlogBansRepository,
        mongoose_2.Model])
], PostsQueryRepository);
exports.PostsQueryRepository = PostsQueryRepository;
//# sourceMappingURL=posts.query-repo.js.map