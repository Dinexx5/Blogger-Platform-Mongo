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
exports.PostsService = void 0;
const posts_repository_1 = require("./posts.repository");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const posts_schema_1 = require("./posts.schema");
const comments_service_1 = require("../comments/comments.service");
const users_repository_1 = require("../users/users.repository");
const blogs_repository_1 = require("../blogs/blogs.repository");
const posts_like_schema_1 = require("../likes/posts.like.schema");
const posts_likes_repository_1 = require("../likes/posts.likes.repository");
const bans_users_for_blog_repository_1 = require("../bans/bans.users-for-blog.repository");
let PostsService = class PostsService {
    constructor(postsRepository, blogsRepository, commentsService, usersRepository, postsLikesRepository, usersBansForBlogsRepo, postModel, postLikeModel) {
        this.postsRepository = postsRepository;
        this.blogsRepository = blogsRepository;
        this.commentsService = commentsService;
        this.usersRepository = usersRepository;
        this.postsLikesRepository = postsLikesRepository;
        this.usersBansForBlogsRepo = usersBansForBlogsRepo;
        this.postModel = postModel;
        this.postLikeModel = postLikeModel;
    }
    async createPost(postBody, blogId, userId) {
        const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
        if (!blogInstance)
            throw new common_1.NotFoundException();
        if (blogInstance.blogOwnerInfo.userId !== userId)
            throw new common_1.ForbiddenException();
        const postDTO = {
            _id: new mongoose_2.default.Types.ObjectId(),
            title: postBody.title,
            shortDescription: postBody.shortDescription,
            content: postBody.content,
            blogId: blogId,
            blogName: blogInstance.name,
            createdAt: blogInstance.createdAt,
            likingUsers: [],
            likes: [],
            extendedLikesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: 'None',
                newestLikes: [],
            },
        };
        const postInstance = new this.postModel(postDTO);
        await this.postsRepository.save(postInstance);
        return {
            id: postInstance._id.toString(),
            title: postInstance.title,
            shortDescription: postInstance.shortDescription,
            content: postInstance.content,
            blogId: postInstance.blogId,
            blogName: postInstance.blogName,
            createdAt: postInstance.createdAt,
            extendedLikesInfo: {
                likesCount: postInstance.extendedLikesInfo.likesCount,
                dislikesCount: postInstance.extendedLikesInfo.dislikesCount,
                myStatus: 'None',
                newestLikes: [],
            },
        };
    }
    async deletePostById(postId, blogId, userId) {
        const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
        if (!blogInstance)
            throw new common_1.NotFoundException();
        if (blogInstance.blogOwnerInfo.userId !== userId)
            throw new common_1.ForbiddenException();
        const postInstance = await this.postsRepository.findPostInstance(postId);
        if (!postInstance)
            throw new common_1.NotFoundException();
        await postInstance.deleteOne();
    }
    async UpdatePostById(postBody, postId, blogId, userId) {
        const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
        if (!blogInstance)
            throw new common_1.NotFoundException();
        if (blogInstance.blogOwnerInfo.userId !== userId)
            throw new common_1.ForbiddenException();
        const postInstance = await this.postsRepository.findPostInstance(postId);
        if (!postInstance)
            throw new common_1.NotFoundException();
        postInstance.title = postBody.title;
        postInstance.shortDescription = postBody.shortDescription;
        postInstance.content = postBody.content;
        postInstance.blogId = blogId;
        await this.postsRepository.save(postInstance);
    }
    async createComment(postId, inputModel, userId) {
        const postInstance = await this.postsRepository.findPostInstance(postId);
        if (!postInstance)
            return null;
        const forbiddenPosts = await this.usersBansForBlogsRepo.getBannedPostsForUser(userId);
        if (forbiddenPosts.includes(postInstance._id.toString()))
            throw new common_1.ForbiddenException();
        return await this.commentsService.createComment(postId, inputModel, userId);
    }
    async likePost(postId, likeStatus, userId) {
        const postInstance = await this.postsRepository.findPostInstance(postId);
        if (!postInstance) {
            return false;
        }
        const userInstance = await this.usersRepository.findUserById(userId);
        const likeInstance = await this.postsLikesRepository.findLikeByPostIdAndUserId(postId, userId);
        if (!likeInstance) {
            const likeDto = {
                postId,
                likeStatus,
                userId,
                login: userInstance.accountData.login,
                createdAt: new Date().toISOString(),
            };
            const newLikeInstance = new this.postLikeModel(likeDto);
            await this.postsLikesRepository.save(newLikeInstance);
            return true;
        }
        likeInstance.likeStatus = likeStatus;
        await this.postsLikesRepository.save(likeInstance);
        return true;
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(6, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __param(7, (0, mongoose_1.InjectModel)(posts_like_schema_1.PostLike.name)),
    __metadata("design:paramtypes", [posts_repository_1.PostsRepository,
        blogs_repository_1.BlogsRepository,
        comments_service_1.CommentsService,
        users_repository_1.UsersRepository,
        posts_likes_repository_1.PostsLikesRepository,
        bans_users_for_blog_repository_1.UsersBansForBlogRepository,
        mongoose_2.Model,
        mongoose_2.Model])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map