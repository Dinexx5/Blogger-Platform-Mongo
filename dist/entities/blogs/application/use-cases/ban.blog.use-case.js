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
exports.BansBlogUseCase = exports.BanBlogCommand = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const posts_repository_1 = require("../../../posts/posts.repository");
const mongoose_1 = require("@nestjs/mongoose");
const bans_schema_1 = require("../../../bans/application/domain/bans.schema");
const mongoose_2 = require("mongoose");
const bans_blogs_repository_1 = require("../../../bans/bans.blogs.repository");
const blogs_repository_1 = require("../../blogs.repository");
const blogs_schema_1 = require("../../domain/blogs.schema");
class BanBlogCommand {
    constructor(blogId, inputModel) {
        this.blogId = blogId;
        this.inputModel = inputModel;
    }
}
exports.BanBlogCommand = BanBlogCommand;
let BansBlogUseCase = class BansBlogUseCase {
    constructor(blogsRepository, postsRepository, blogBansRepository, blogModel, blogBanModel) {
        this.blogsRepository = blogsRepository;
        this.postsRepository = postsRepository;
        this.blogBansRepository = blogBansRepository;
        this.blogModel = blogModel;
        this.blogBanModel = blogBanModel;
    }
    async execute(command) {
        const blogId = command.blogId;
        const inputModel = command.inputModel;
        const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
        if (inputModel.isBanned === true) {
            const isBannedBefore = await this.blogBansRepository.findBanByBlogId(blogId);
            if (isBannedBefore)
                return;
            blogInstance.banInfo.isBanned = true;
            blogInstance.banInfo.banDate = new Date().toISOString();
            blogInstance.markModified('banInfo');
            await this.blogsRepository.save(blogInstance);
            const bannedPostsId = await this.postsRepository.findPostsForUser([blogId]);
            const banDto = Object.assign(Object.assign({ blogId }, inputModel), { bannedPostsId });
            const banInstance = new this.blogBanModel(banDto);
            await this.blogBansRepository.save(banInstance);
            return;
        }
        const bananaInstance = await this.blogBansRepository.findBanByBlogId(blogId);
        if (!bananaInstance) {
            return;
        }
        blogInstance.banInfo.isBanned = false;
        blogInstance.banInfo.banDate = null;
        await this.blogsRepository.save(blogInstance);
        await bananaInstance.deleteOne();
    }
};
BansBlogUseCase = __decorate([
    (0, cqrs_1.CommandHandler)(BanBlogCommand),
    __param(3, (0, mongoose_1.InjectModel)(blogs_schema_1.Blog.name)),
    __param(4, (0, mongoose_1.InjectModel)(bans_schema_1.BlogBan.name)),
    __metadata("design:paramtypes", [blogs_repository_1.BlogsRepository,
        posts_repository_1.PostsRepository,
        bans_blogs_repository_1.BlogBansRepository,
        mongoose_2.Model,
        mongoose_2.Model])
], BansBlogUseCase);
exports.BansBlogUseCase = BansBlogUseCase;
//# sourceMappingURL=ban.blog.use-case.js.map