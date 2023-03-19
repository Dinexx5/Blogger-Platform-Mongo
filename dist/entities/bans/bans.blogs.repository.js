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
exports.BlogBansRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const bans_schema_1 = require("./application/domain/bans.schema");
let BlogBansRepository = class BlogBansRepository {
    constructor(blogBanModel) {
        this.blogBanModel = blogBanModel;
    }
    async findBanByBlogId(blogId) {
        return this.blogBanModel.findOne({ blogId: blogId });
    }
    async countBannedBlogs() {
        return this.blogBanModel.countDocuments({});
    }
    async getBannedBlogs() {
        const bannedUsersCount = await this.countBannedBlogs();
        if (!bannedUsersCount)
            return [];
        const allBans = await this.blogBanModel.find({}).lean();
        const bannedBlogs = [];
        allBans.forEach((ban) => {
            bannedBlogs.push(ban.blogId);
        });
        const bannedBlogsObjId = bannedBlogs.map((blogId) => new mongoose_2.default.Types.ObjectId(blogId));
        return bannedBlogsObjId;
    }
    async getBannedPosts() {
        const bannedUsersCount = await this.countBannedBlogs();
        if (!bannedUsersCount)
            return [];
        const allBans = await this.blogBanModel.find({}).lean();
        const bannedPosts = [];
        allBans.forEach((ban) => {
            bannedPosts.push(...ban.bannedPostsId);
        });
        const bannedPostsObjId = bannedPosts.map((postId) => new mongoose_2.default.Types.ObjectId(postId));
        return bannedPostsObjId;
    }
    async save(instance) {
        instance.save();
    }
};
BlogBansRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bans_schema_1.BlogBan.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlogBansRepository);
exports.BlogBansRepository = BlogBansRepository;
//# sourceMappingURL=bans.blogs.repository.js.map