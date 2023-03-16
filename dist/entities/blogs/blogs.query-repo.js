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
exports.BlogsQueryRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const blogs_schema_1 = require("./blogs.schema");
const mongoose_2 = __importStar(require("mongoose"));
const bans_repository_1 = require("../bans/bans.repository");
function mapFoundBlogToBlogViewModel(blog) {
    return {
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        isMembership: blog.isMembership,
        createdAt: blog.createdAt,
        id: blog._id.toString(),
    };
}
let BlogsQueryRepository = class BlogsQueryRepository {
    constructor(bansRepository, blogModel) {
        this.bansRepository = bansRepository;
        this.blogModel = blogModel;
    }
    async getAllBlogs(query, userId) {
        const { sortDirection = 'desc', sortBy = 'createdAt', pageNumber = 1, pageSize = 10, searchNameTerm = null, } = query;
        const sortDirectionInt = sortDirection === 'desc' ? -1 : 1;
        const skippedBlogsCount = (+pageNumber - 1) * +pageSize;
        const bannedBlogs = await this.bansRepository.getBannedBlogs();
        const filter = { _id: { $nin: bannedBlogs } };
        if (searchNameTerm) {
            filter.name = { $regex: searchNameTerm, $options: 'i' };
        }
        if (userId) {
            filter.ownerId = { $regex: userId };
        }
        const countAll = await this.blogModel.countDocuments(filter);
        const blogsDb = await this.blogModel
            .find(filter)
            .sort({ [sortBy]: sortDirectionInt })
            .skip(skippedBlogsCount)
            .limit(+pageSize)
            .lean();
        const blogsView = blogsDb.map(mapFoundBlogToBlogViewModel);
        return {
            pagesCount: Math.ceil(countAll / +pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: countAll,
            items: blogsView,
        };
    }
    async findBlogById(blogId) {
        const _id = new mongoose_2.default.Types.ObjectId(blogId);
        const foundBlog = await this.blogModel.findOne({
            _id: _id,
        });
        if (!foundBlog) {
            return null;
        }
        return mapFoundBlogToBlogViewModel(foundBlog);
    }
};
BlogsQueryRepository = __decorate([
    __param(1, (0, mongoose_1.InjectModel)(blogs_schema_1.Blog.name)),
    __metadata("design:paramtypes", [bans_repository_1.BansRepository,
        mongoose_2.Model])
], BlogsQueryRepository);
exports.BlogsQueryRepository = BlogsQueryRepository;
//# sourceMappingURL=blogs.query-repo.js.map