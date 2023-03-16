"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blogs_schema_1 = require("./blogs.schema");
const blogger_controller_1 = require("./blogger.controller");
const blogs_service_1 = require("./blogs.service");
const blogs_repository_1 = require("./blogs.repository");
const blogs_query_repo_1 = require("./blogs.query-repo");
const blog_exists_decorator_1 = require("../../shared/decorators/validation/blog-exists.decorator");
const auth_module_1 = require("../auth/auth.module");
const posts_module_1 = require("../posts/posts.module");
const blogs_controller_1 = require("./blogs.controller");
const users_module_1 = require("../users/users.module");
const sa_blogs_controller_1 = require("./sa.blogs.controller");
const sa_blogs_service_1 = require("./sa.blogs.service");
const user_exists_decorator_1 = require("../../shared/decorators/validation/user-exists.decorator");
const sa_blog_query_repo_1 = require("./sa.blog.query-repo");
const bans_service_1 = require("../bans/bans.service");
const comments_module_1 = require("../comments/comments.module");
const bans_repository_1 = require("../bans/bans.repository");
const devices_module_1 = require("../devices/devices.module");
const token_module_1 = require("../tokens/token.module");
const bans_schema_1 = require("../bans/bans.schema");
const users_schema_1 = require("../users/users.schema");
let BlogsModule = class BlogsModule {
};
BlogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            posts_module_1.PostsModule,
            users_module_1.UsersModule,
            comments_module_1.CommentsModule,
            devices_module_1.DevicesModule,
            token_module_1.TokensModule,
            mongoose_1.MongooseModule.forFeature([{ name: blogs_schema_1.Blog.name, schema: blogs_schema_1.BlogSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: bans_schema_1.Ban.name, schema: bans_schema_1.BanSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }]),
        ],
        providers: [
            blogs_service_1.BlogsService,
            blogs_repository_1.BlogsRepository,
            blogs_query_repo_1.BlogsQueryRepository,
            blog_exists_decorator_1.IsBlogExistsDecorator,
            user_exists_decorator_1.IsUserExistsDecorator,
            sa_blogs_service_1.SuperAdminBlogsService,
            sa_blog_query_repo_1.BlogsSAQueryRepository,
            bans_service_1.BansService,
            bans_repository_1.BansRepository,
        ],
        controllers: [blogger_controller_1.BloggerController, blogs_controller_1.BlogsController, sa_blogs_controller_1.SuperAdminBlogsController],
        exports: [blogs_service_1.BlogsService, blogs_repository_1.BlogsRepository, blogs_query_repo_1.BlogsQueryRepository, sa_blogs_service_1.SuperAdminBlogsService],
    })
], BlogsModule);
exports.BlogsModule = BlogsModule;
//# sourceMappingURL=blogs.module.js.map