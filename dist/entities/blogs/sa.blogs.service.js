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
exports.SuperAdminBlogsService = void 0;
const blogs_repository_1 = require("./blogs.repository");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blogs_schema_1 = require("./domain/blogs.schema");
const mongoose_2 = require("mongoose");
const users_repository_1 = require("../users/users.repository");
let SuperAdminBlogsService = class SuperAdminBlogsService {
    constructor(blogsRepository, usersRepository, blogModel) {
        this.blogsRepository = blogsRepository;
        this.usersRepository = usersRepository;
        this.blogModel = blogModel;
    }
    async UpdateBlogById(blogId, userId) {
        const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
        const userInstance = await this.usersRepository.findUserById(userId);
        blogInstance.blogOwnerInfo.userId = userId;
        blogInstance.blogOwnerInfo.userLogin = userInstance.accountData.login;
        blogInstance.markModified('blogOwnerInfo');
        await this.blogsRepository.save(blogInstance);
    }
};
SuperAdminBlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(blogs_schema_1.Blog.name)),
    __metadata("design:paramtypes", [blogs_repository_1.BlogsRepository,
        users_repository_1.UsersRepository,
        mongoose_2.Model])
], SuperAdminBlogsService);
exports.SuperAdminBlogsService = SuperAdminBlogsService;
//# sourceMappingURL=sa.blogs.service.js.map