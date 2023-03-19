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
exports.UsersBansForBlogRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bans_schema_1 = require("./application/domain/bans.schema");
let UsersBansForBlogRepository = class UsersBansForBlogRepository {
    constructor(banUserForBlogModel) {
        this.banUserForBlogModel = banUserForBlogModel;
    }
    async findBanByBlogAndUserId(blogId, userId) {
        return this.banUserForBlogModel.findOne({ $and: [{ blogId: blogId }, { userId: userId }] });
    }
    async countBannedUsers() {
        return this.banUserForBlogModel.countDocuments({});
    }
    async getBannedPostsForUser(userId) {
        const bannedUsersCount = await this.countBannedUsers();
        if (!bannedUsersCount)
            return [];
        const allBansForUser = await this.banUserForBlogModel.find({ userId: userId }).lean();
        const forbiddenPosts = [];
        allBansForUser.forEach((ban) => {
            forbiddenPosts.push(...ban.bannedPostsId);
        });
        return forbiddenPosts;
    }
    async save(instance) {
        instance.save();
    }
};
UsersBansForBlogRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bans_schema_1.UserForBlogBan.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersBansForBlogRepository);
exports.UsersBansForBlogRepository = UsersBansForBlogRepository;
//# sourceMappingURL=bans.users-for-blog.repository.js.map