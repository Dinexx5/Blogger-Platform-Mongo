import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './domain/blogs.schema';
import { BloggerController } from './blogger.controller';
import { BlogsService } from './blogs.service';
import { BlogsRepository } from './blogs.repository';
import { BlogsQueryRepository } from './blogs.query-repo';
import { IsBlogAttachedDecorator } from '../../shared/decorators/validation/blog-bound.decorator';
import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';
import { BlogsController } from './blogs.controller';
import { UsersModule } from '../users/users.module';
import { SuperAdminBlogsController } from './sa.blogs.controller';
import { SuperAdminBlogsService } from './sa.blogs.service';
import { IsUserExistsDecorator } from '../../shared/decorators/validation/user-exists.decorator';
import { BlogsSAQueryRepository } from './sa.blog.query-repo';
import { BansUserUseCase } from '../bans/application/use-cases/ban.user.use.case.';
import { CommentsModule } from '../comments/comments.module';
import { BansRepository } from '../bans/bans.repository';
import { DevicesModule } from '../devices/devices.module';
import { TokensModule } from '../tokens/token.module';
import {
  Ban,
  BanSchema,
  BanUserForBlogSchema,
  BlogBan,
  BlogBanSchema,
  UserForBlogBan,
} from '../bans/application/domain/bans.schema';
import { User, UserSchema } from '../users/users.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { BansBlogUseCase } from './application/use-cases/ban.blog.use-case';
import { BlogBansRepository } from '../bans/bans.blogs.repository';
import { BloggerUsersController } from './blogger.users.controller';
import { UsersBansForBlogRepository } from '../bans/bans.users-for-blog.repository';
import { BanUserForBlogUseCase } from './application/use-cases/ban.user.for.blog.use-case';
import { BloggerBansQueryRepository } from './blogger.bans.query-repository';
import { BloggerCommentsQueryRepository } from './blogger.comments.query-repo';
import { Comment, CommentSchema } from '../comments/comments.schema';

@Module({
  imports: [
    CqrsModule,
    AuthModule,
    PostsModule,
    UsersModule,
    CommentsModule,
    DevicesModule,
    TokensModule,
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Ban.name, schema: BanSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: BlogBan.name, schema: BlogBanSchema }]),
    MongooseModule.forFeature([{ name: UserForBlogBan.name, schema: BanUserForBlogSchema }]),
  ],
  providers: [
    BlogsService,
    BlogsRepository,
    BlogsQueryRepository,
    IsBlogAttachedDecorator,
    IsUserExistsDecorator,
    SuperAdminBlogsService,
    BlogsSAQueryRepository,
    BansUserUseCase,
    BansBlogUseCase,
    BansRepository,
    BlogBansRepository,
    UsersBansForBlogRepository,
    BanUserForBlogUseCase,
    BloggerBansQueryRepository,
    BloggerCommentsQueryRepository,
  ],
  controllers: [
    BloggerController,
    BloggerUsersController,
    BlogsController,
    SuperAdminBlogsController,
  ],
  exports: [
    BlogsService,
    BlogsRepository,
    BlogsQueryRepository,
    SuperAdminBlogsService,
    BloggerCommentsQueryRepository,
  ],
})
export class BlogsModule {}
