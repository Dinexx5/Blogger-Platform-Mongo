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
exports.BloggerCommentsQueryRepository = void 0;
const blogs_repository_1 = require("../blogs.repository");
const posts_repository_1 = require("../../posts/posts.repository");
const mongoose_1 = require("@nestjs/mongoose");
const comments_schema_1 = require("../../comments/comments.schema");
const mongoose_2 = require("mongoose");
function mapCommentsToViewModel(comment) {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin,
        },
        createdAt: comment.createdAt,
        postInfo: {
            id: comment.postInfo.id,
            title: comment.postInfo.title,
            blogId: comment.postInfo.blogId,
            blogName: comment.postInfo.blogName,
        },
    };
}
let BloggerCommentsQueryRepository = class BloggerCommentsQueryRepository {
    constructor(blogsRepository, postsRepository, commentModel) {
        this.blogsRepository = blogsRepository;
        this.postsRepository = postsRepository;
        this.commentModel = commentModel;
    }
    async getAllComments(query, userId) {
        const { sortDirection = 'desc', sortBy = 'createdAt', pageNumber = 1, pageSize = 10 } = query;
        const sortDirectionInt = sortDirection === 'desc' ? -1 : 1;
        const skippedBlogsCount = (+pageNumber - 1) * +pageSize;
        const allBlogs = await this.blogsRepository.findBlogsForUser(userId);
        const allPosts = await this.postsRepository.findPostsForUser(allBlogs);
        const filter = { postId: { $in: allPosts } };
        const countAll = await this.commentModel.countDocuments(filter);
        const comments = await this.commentModel
            .find(filter)
            .sort({ [sortBy]: sortDirectionInt })
            .skip(skippedBlogsCount)
            .limit(+pageSize);
        const commentsView = comments.map(mapCommentsToViewModel);
        return {
            pagesCount: Math.ceil(countAll / +pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: countAll,
            items: commentsView,
        };
    }
};
BloggerCommentsQueryRepository = __decorate([
    __param(2, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __metadata("design:paramtypes", [blogs_repository_1.BlogsRepository,
        posts_repository_1.PostsRepository,
        mongoose_2.Model])
], BloggerCommentsQueryRepository);
exports.BloggerCommentsQueryRepository = BloggerCommentsQueryRepository;
//# sourceMappingURL=blogger.comments.query-repo.js.map