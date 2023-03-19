import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { PostsQueryRepository } from './posts.query-repo';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';
import { Post, PostSchema } from './posts.schema';
import { PostsController } from './posts.controller';
import { UsersModule } from '../users/users.module';
import { BlogsQueryRepository } from '../blogs/blogs.query-repo';
import { CommentsModule } from '../comments/comments.module';
import { Blog, BlogSchema } from '../blogs/domain/blogs.schema';
import { BlogsRepository } from '../blogs/blogs.repository';
import { BansUserUseCase } from '../bans/application/use-cases/ban.user.use.case.';
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
import { PostsLikesRepository } from '../likes/posts.likes.repository';
import { CommentLike, CommentLikeSchema } from '../likes/comments.like.schema';
import { PostLike, PostLikeSchema } from '../likes/posts.like.schema';
import { User, UserSchema } from '../users/users.schema';
import { BlogBansRepository } from '../bans/bans.blogs.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersBansForBlogRepository } from '../bans/bans.users-for-blog.repository';

@Module({
  imports: [
    CqrsModule,
    AuthModule,
    UsersModule,
    CommentsModule,
    DevicesModule,
    TokensModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Ban.name, schema: BanSchema }]),
    MongooseModule.forFeature([{ name: PostLike.name, schema: PostLikeSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: BlogBan.name, schema: BlogBanSchema }]),
    MongooseModule.forFeature([{ name: UserForBlogBan.name, schema: BanUserForBlogSchema }]),
  ],
  providers: [
    PostsService,
    PostsRepository,
    PostsQueryRepository,
    BlogsQueryRepository,
    BlogsRepository,
    BansUserUseCase,
    BansRepository,
    PostsLikesRepository,
    BlogBansRepository,
    UsersBansForBlogRepository,
  ],
  controllers: [PostsController],
  exports: [
    PostsService,
    PostsRepository,
    PostsQueryRepository,
    BlogsQueryRepository,
    BlogsRepository,
    PostsLikesRepository,
  ],
})
export class PostsModule {}
