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
exports.BansUserUseCase = exports.BansUserCommand = void 0;
const users_repository_1 = require("../../../users/users.repository");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bans_repository_1 = require("../../bans.repository");
const bans_schema_1 = require("../domain/bans.schema");
const devices_repository_1 = require("../../../devices/devices.repository");
const token_repository_1 = require("../../../tokens/token.repository");
const blogs_repository_1 = require("../../../blogs/blogs.repository");
const posts_repository_1 = require("../../../posts/posts.repository");
const comments_repository_1 = require("../../../comments/comments.repository");
const users_schema_1 = require("../../../users/users.schema");
const cqrs_1 = require("@nestjs/cqrs");
class BansUserCommand {
    constructor(userId, inputModel) {
        this.userId = userId;
        this.inputModel = inputModel;
    }
}
exports.BansUserCommand = BansUserCommand;
let BansUserUseCase = class BansUserUseCase {
    constructor(usersRepository, blogsRepository, postsRepository, commentsRepository, bansRepository, devicesRepository, tokensRepository, banModel, userModel) {
        this.usersRepository = usersRepository;
        this.blogsRepository = blogsRepository;
        this.postsRepository = postsRepository;
        this.commentsRepository = commentsRepository;
        this.bansRepository = bansRepository;
        this.devicesRepository = devicesRepository;
        this.tokensRepository = tokensRepository;
        this.banModel = banModel;
        this.userModel = userModel;
    }
    async execute(command) {
        const userId = command.userId;
        const inputModel = command.inputModel;
        const userInstance = await this.usersRepository.findUserById(userId);
        const login = userInstance.accountData.login;
        if (inputModel.isBanned === true) {
            const isBannedBefore = await this.bansRepository.findBanByUserId(userId);
            if (isBannedBefore)
                return;
            userInstance.banInfo.isBanned = true;
            userInstance.banInfo.banDate = new Date().toISOString();
            userInstance.banInfo.banReason = inputModel.banReason;
            userInstance.markModified('banInfo');
            await this.usersRepository.save(userInstance);
            await this.devicesRepository.deleteDevicesForBan(userId);
            await this.tokensRepository.deleteTokensForBan(userId);
            const bannedBlogsId = await this.blogsRepository.findBlogsForUser(userId);
            const bannedPostsId = await this.postsRepository.findPostsForUser(bannedBlogsId);
            const bannedCommentsId = await this.commentsRepository.findBannedComments(userId);
            const banDto = Object.assign(Object.assign({ userId,
                login }, inputModel), { bannedBlogsId,
                bannedPostsId,
                bannedCommentsId });
            const banInstance = new this.banModel(banDto);
            await this.bansRepository.save(banInstance);
            return;
        }
        const bananaInstance = await this.bansRepository.findBanByUserId(userId);
        if (!bananaInstance) {
            return;
        }
        userInstance.banInfo.isBanned = false;
        userInstance.banInfo.banDate = null;
        userInstance.banInfo.banReason = null;
        userInstance.markModified('banInfo');
        await this.usersRepository.save(userInstance);
        await bananaInstance.deleteOne();
    }
};
BansUserUseCase = __decorate([
    (0, cqrs_1.CommandHandler)(BansUserCommand),
    __param(7, (0, mongoose_1.InjectModel)(bans_schema_1.Ban.name)),
    __param(8, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        blogs_repository_1.BlogsRepository,
        posts_repository_1.PostsRepository,
        comments_repository_1.CommentsRepository,
        bans_repository_1.BansRepository,
        devices_repository_1.DevicesRepository,
        token_repository_1.TokenRepository,
        mongoose_2.Model,
        mongoose_2.Model])
], BansUserUseCase);
exports.BansUserUseCase = BansUserUseCase;
//# sourceMappingURL=ban.user.use.case..js.map