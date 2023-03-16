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
import { Blog, BlogSchema } from '../blogs/blogs.schema';
import { BlogsRepository } from '../blogs/blogs.repository';
import { BansService } from '../bans/bans.service';
import { BansRepository } from '../bans/bans.repository';
import { DevicesModule } from '../devices/devices.module';
import { TokensModule } from '../tokens/token.module';
import { Ban, BanSchema } from '../bans/bans.schema';
import { PostsLikesRepository } from '../likes/posts.likes.repository';
import { CommentLike, CommentLikeSchema } from '../likes/comments.like.schema';
import { PostLike, PostLikeSchema } from '../likes/posts.like.schema';
import { User, UserSchema } from '../users/users.schema';

@Module({
  imports: [
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
  ],
  providers: [
    PostsService,
    PostsRepository,
    PostsQueryRepository,
    BlogsQueryRepository,
    BlogsRepository,
    BansService,
    BansRepository,
    PostsLikesRepository,
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
