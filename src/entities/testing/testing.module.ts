import { Module } from '@nestjs/common';
import { TestingController } from './testing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from '../blogs/blogs.schema';
import { Post, PostSchema } from '../posts/posts.schema';
import { Comment, CommentSchema } from '../comments/comments.schema';
import { User, UserSchema } from '../users/users.schema';
import { Attempt, AttemptSchema } from '../attempts/attempts.schema';
import { Token, TokenSchema } from '../tokens/token.schema';
import { Device, DeviceSchema } from '../devices/devices.schema';
import { Ban, BanSchema } from '../bans/bans.schema';

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
  ],
  providers: [],
  controllers: [TestingController],
  exports: [],
})
export class TestingModule {}
