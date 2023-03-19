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
exports.BanUserForBlogUseCase = exports.BanUserForBlogCommand = void 0;
const users_repository_1 = require("../../../users/users.repository");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blogs_repository_1 = require("../../../blogs/blogs.repository");
const posts_repository_1 = require("../../../posts/posts.repository");
const users_schema_1 = require("../../../users/users.schema");
const cqrs_1 = require("@nestjs/cqrs");
const bans_schema_1 = require("../../../bans/application/domain/bans.schema");
const bans_users_for_blog_repository_1 = require("../../../bans/bans.users-for-blog.repository");
const common_1 = require("@nestjs/common");
class BanUserForBlogCommand {
    constructor(userId, inputModel) {
        this.userId = userId;
        this.inputModel = inputModel;
    }
}
exports.BanUserForBlogCommand = BanUserForBlogCommand;
let BanUserForBlogUseCase = class BanUserForBlogUseCase {
    constructor(usersRepository, postsRepository, blogsRepository, usersBansForBlogsRepository, banUserForBlogModel, userModel) {
        this.usersRepository = usersRepository;
        this.postsRepository = postsRepository;
        this.blogsRepository = blogsRepository;
        this.usersBansForBlogsRepository = usersBansForBlogsRepository;
        this.banUserForBlogModel = banUserForBlogModel;
        this.userModel = userModel;
    }
    async execute(command) {
        const userId = command.userId;
        const inputModel = command.inputModel;
        const blogInstance = await this.blogsRepository.findBlogInstance(inputModel.blogId);
        if (!blogInstance)
            throw new common_1.NotFoundException();
        const userInstance = await this.usersRepository.findUserById(userId);
        const login = userInstance.accountData.login;
        if (inputModel.isBanned === true) {
            const isBannedBefore = await this.usersBansForBlogsRepository.findBanByBlogAndUserId(inputModel.blogId, userId);
            if (isBannedBefore)
                return;
            const bannedPostsId = await this.postsRepository.findPostsForUser([inputModel.blogId]);
            const banDto = Object.assign(Object.assign({ userId,
                login }, inputModel), { bannedPostsId, banDate: new Date().toISOString() });
            const banInstance = new this.banUserForBlogModel(banDto);
            await this.usersBansForBlogsRepository.save(banInstance);
            return;
        }
        const bananaInstance = await this.usersBansForBlogsRepository.findBanByBlogAndUserId(inputModel.blogId, userId);
        if (!bananaInstance) {
            return;
        }
        await bananaInstance.deleteOne();
    }
};
BanUserForBlogUseCase = __decorate([
    (0, cqrs_1.CommandHandler)(BanUserForBlogCommand),
    __param(4, (0, mongoose_1.InjectModel)(bans_schema_1.UserForBlogBan.name)),
    __param(5, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        posts_repository_1.PostsRepository,
        blogs_repository_1.BlogsRepository,
        bans_users_for_blog_repository_1.UsersBansForBlogRepository,
        mongoose_2.Model,
        mongoose_2.Model])
], BanUserForBlogUseCase);
exports.BanUserForBlogUseCase = BanUserForBlogUseCase;
//# sourceMappingURL=ban.user.for.blog.use-case.js.map