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
exports.BlogsService = void 0;
const blogs_repository_1 = require("./blogs.repository");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blogs_schema_1 = require("./domain/blogs.schema");
const mongoose_2 = __importStar(require("mongoose"));
const users_repository_1 = require("../users/users.repository");
let BlogsService = class BlogsService {
    constructor(blogsRepository, usersRepository, blogModel) {
        this.blogsRepository = blogsRepository;
        this.usersRepository = usersRepository;
        this.blogModel = blogModel;
    }
    async createBlog(inputModel, userId) {
        const userInstance = await this.usersRepository.findUserById(userId);
        const blogDTO = {
            _id: new mongoose_2.default.Types.ObjectId(),
            name: inputModel.name,
            description: inputModel.description,
            isMembership: false,
            websiteUrl: inputModel.websiteUrl,
            createdAt: new Date().toISOString(),
            blogOwnerInfo: { userId: userId, userLogin: userInstance.accountData.login },
            banInfo: { isBanned: false, banDate: null },
        };
        const blogInstance = new this.blogModel(blogDTO);
        await this.blogsRepository.save(blogInstance);
        return {
            name: blogInstance.name,
            description: blogInstance.description,
            websiteUrl: blogInstance.websiteUrl,
            isMembership: blogInstance.isMembership,
            createdAt: blogInstance.createdAt,
            id: blogInstance._id.toString(),
        };
    }
    async deleteBlogById(blogId, userId) {
        const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
        if (!blogInstance)
            throw new common_1.NotFoundException();
        if (blogInstance.blogOwnerInfo.userId !== userId)
            throw new common_1.ForbiddenException();
        await blogInstance.deleteOne();
    }
    async UpdateBlogById(blogBody, blogId, userId) {
        const { name, description, websiteUrl } = blogBody;
        const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
        if (!blogInstance)
            throw new common_1.NotFoundException();
        if (blogInstance.blogOwnerInfo.userId !== userId)
            throw new common_1.ForbiddenException();
        blogInstance.name = name;
        blogInstance.description = description;
        blogInstance.websiteUrl = websiteUrl;
        await this.blogsRepository.save(blogInstance);
    }
};
BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(blogs_schema_1.Blog.name)),
    __metadata("design:paramtypes", [blogs_repository_1.BlogsRepository,
        users_repository_1.UsersRepository,
        mongoose_2.Model])
], BlogsService);
exports.BlogsService = BlogsService;
//# sourceMappingURL=blogs.service.js.map