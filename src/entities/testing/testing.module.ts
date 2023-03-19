import { Module } from '@nestjs/common';
import { TestingController } from './testing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from '../blogs/domain/blogs.schema';
import { Post, PostSchema } from '../posts/posts.schema';
import { Comment, CommentSchema } from '../comments/comments.schema';
import { User, UserSchema } from '../users/users.schema';
import { Attempt, AttemptSchema } from '../attempts/attempts.schema';
import { Token, TokenSchema } from '../tokens/token.schema';
import { Device, DeviceSchema } from '../devices/devices.schema';
import {
  Ban,
  BanSchema,
  BanUserForBlogSchema,
  BlogBan,
  BlogBanSchema,
  UserForBlogBan,
} from '../bans/application/domain/bans.schema';
import { CommentLike, CommentLikeSchema } from '../likes/comments.like.schema';
import { PostLike, PostLikeSchema } from '../likes/posts.like.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Attempt.name, schema: AttemptSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    MongooseModule.forFeature([{ name: Ban.name, schema: BanSchema }]),
    MongooseModule.forFeature([{ name: CommentLike.name, schema: CommentLikeSchema }]),
    MongooseModule.forFeature([{ name: PostLike.name, schema: PostLikeSchema }]),
    MongooseModule.forFeature([{ name: BlogBan.name, schema: BlogBanSchema }]),
    MongooseModule.forFeature([{ name: UserForBlogBan.name, schema: BanUserForBlogSchema }]),
  ],
  providers: [],
  controllers: [TestingController],
  exports: [],
})
export class TestingModule {}
