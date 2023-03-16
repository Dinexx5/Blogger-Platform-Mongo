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
import { Blog, BlogSchema } from '../blogs/blogs.schema';
import { BlogsRepository } from '../blogs/blogs.repository';
import { BansService } from '../bans/bans.service';
import { BansRepository } from '../bans/bans.repository';
import { DevicesModule } from '../devices/devices.module';
import { TokensModule } from '../tokens/token.module';
import { Ban, BanSchema } from '../bans/bans.schema';
import { CommentsLikesRepository } from '../likes/comments.likes.repository';
import { CommentLike, CommentLikeSchema } from '../likes/comments.like.schema';
import { PostsLikesRepository } from '../likes/posts.likes.repository';
import { PostLike, PostLikeSchema } from '../likes/posts.like.schema';
import { User, UserSchema } from '../users/users.schema';

@Module({
  imports: [
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
    BansService,
    BansRepository,
    CommentsLikesRepository,
    PostsLikesRepository,
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
