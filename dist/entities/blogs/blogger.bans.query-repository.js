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
exports.BloggerBansQueryRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bans_schema_1 = require("../bans/application/domain/bans.schema");
const common_1 = require("@nestjs/common");
const blogs_repository_1 = require("./blogs.repository");
function mapFoundBansToViewModel(ban) {
    return {
        id: ban.userId,
        login: ban.login,
        banInfo: {
            isBanned: ban.isBanned,
            banDate: ban.banDate,
            banReason: ban.banReason,
        },
    };
}
let BloggerBansQueryRepository = class BloggerBansQueryRepository {
    constructor(blogsRepository, banUserForBlogModel) {
        this.blogsRepository = blogsRepository;
        this.banUserForBlogModel = banUserForBlogModel;
    }
    async getAllUsers(query, blogId, userId) {
        const { sortDirection = 'desc', sortBy = 'createdAt', pageNumber = 1, pageSize = 10, searchNameTerm = null, } = query;
        const sortDirectionInt = sortDirection === 'desc' ? -1 : 1;
        const skippedBlogsCount = (+pageNumber - 1) * +pageSize;
        const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
        if (!blogInstance)
            throw new common_1.NotFoundException();
        if (blogInstance.blogOwnerInfo.userId !== userId)
            throw new common_1.ForbiddenException();
        const filter = { blogId: blogId };
        if (searchNameTerm) {
            filter.name = { $regex: searchNameTerm, $options: 'i' };
        }
        const countAll = await this.banUserForBlogModel.countDocuments(filter);
        const bans = await this.banUserForBlogModel
            .find(filter)
            .sort({ [sortBy]: sortDirectionInt })
            .skip(skippedBlogsCount)
            .limit(+pageSize)
            .lean();
        const bansView = bans.map(mapFoundBansToViewModel);
        return {
            pagesCount: Math.ceil(countAll / +pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: countAll,
            items: bansView,
        };
    }
};
BloggerBansQueryRepository = __decorate([
    __param(1, (0, mongoose_1.InjectModel)(bans_schema_1.UserForBlogBan.name)),
    __metadata("design:paramtypes", [blogs_repository_1.BlogsRepository,
        mongoose_2.Model])
], BloggerBansQueryRepository);
exports.BloggerBansQueryRepository = BloggerBansQueryRepository;
//# sourceMappingURL=blogger.bans.query-repository.js.map