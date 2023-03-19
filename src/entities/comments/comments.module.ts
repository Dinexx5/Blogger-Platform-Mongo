import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CommentsController } from './comments.controller';
import { CommentsQueryRepository } from './comments.query-repo';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';
import { Comment, CommentSchema } from './comments.schema';
import { PostsService } from '../posts/posts.service';
import { PostsRepository } from '../posts/posts.repository';
import { BlogsQueryRepository } from '../blogs/blogs.query-repo';
import { IsLikeStatusCorrectDecorator } from '../../shared/decorators/validation/like-status.decorator';
import { Post, PostSchema } from '../posts/posts.schema';
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
import { CommentsLikesRepository } from '../likes/comments.likes.repository';
import { CommentLike, CommentLikeSchema } from '../likes/comments.like.schema';
import { PostsLikesRepository } from '../likes/posts.likes.repository';
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
    DevicesModule,
    TokensModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Ban.name, schema: BanSchema }]),
    MongooseModule.forFeature([{ name: CommentLike.name, schema: CommentLikeSchema }]),
    MongooseModule.forFeature([{ name: PostLike.name, schema: PostLikeSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: BlogBan.name, schema: BlogBanSchema }]),
    MongooseModule.forFeature([{ name: UserForBlogBan.name, schema: BanUserForBlogSchema }]),
  ],
  providers: [
    CommentsQueryRepository,
    CommentsRepository,
    CommentsService,
    PostsService,
    PostsRepository,
    BlogsQueryRepository,
    BlogsRepository,
    IsLikeStatusCorrectDecorator,
    BansUserUseCase,
    BansRepository,
    BlogBansRepository,
    CommentsLikesRepository,
    PostsLikesRepository,
    UsersBansForBlogRepository,
  ],
  controllers: [CommentsController],
  exports: [
    CommentsQueryRepository,
    CommentsRepository,
    CommentsService,
    PostsService,
    PostsRepository,
    BlogsQueryRepository,
    BlogsRepository,
    IsLikeStatusCorrectDecorator,
    CommentsLikesRepository,
    PostsLikesRepository,
  ],
})
export class CommentsModule {}
