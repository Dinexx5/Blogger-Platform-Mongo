import { Controller, Delete, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../blogs/domain/blogs.schema';
import { Response } from 'express';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../posts/posts.schema';
import { User, UserDocument } from '../users/users.schema';
import { Comment, CommentDocument } from '../comments/comments.schema';
import { Attempt, AttemptDocument } from '../attempts/attempts.schema';
import { Token, TokenDocument } from '../tokens/token.schema';
import { Device, DeviceDocument } from '../devices/devices.schema';
import {
  Ban,
  BanDocument,
  BlogBan,
  BlogBanDocument,
  UserForBlogBan,
  UserForBlogBanDocument,
} from '../bans/application/domain/bans.schema';
import { PostLike, PostLikeDocument } from '../likes/posts.like.schema';
import { CommentLike, CommentLikeDocument } from '../likes/comments.like.schema';

@Controller('testing')
export class TestingController {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Attempt.name) private attemptModel: Model<AttemptDocument>,
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    @InjectModel(Ban.name) private banModel: Model<BanDocument>,
    @InjectModel(PostLike.name) private postLikeModel: Model<PostLikeDocument>,
    @InjectModel(CommentLike.name) private commentLikeModel: Model<CommentLikeDocument>,
    @InjectModel(BlogBan.name) private blogBanModel: Model<BlogBanDocument>,
    @InjectModel(UserForBlogBan.name) private banUserForBlogModel: Model<UserForBlogBanDocument>,
  ) {}
  @Delete('all-data')
  async deleteAll(@Res() res: Response) {
    await this.blogModel.deleteMany({});
    await this.postModel.deleteMany({});
    await this.userModel.deleteMany({});
    await this.commentModel.deleteMany({});
    await this.attemptModel.deleteMany({});
    await this.tokenModel.deleteMany({});
    await this.deviceModel.deleteMany({});
    await this.banModel.deleteMany({});
    await this.postLikeModel.deleteMany({});
    await this.commentLikeModel.deleteMany({});
    await this.blogBanModel.deleteMany({});
    await this.banUserForBlogModel.deleteMany({});
    return res.sendStatus(204);
  }
}
