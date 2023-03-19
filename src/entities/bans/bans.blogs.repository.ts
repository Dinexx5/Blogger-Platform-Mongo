import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ban, BanDocument, BlogBan, BlogBanDocument } from './application/domain/bans.schema';

@Injectable()
export class BlogBansRepository {
  constructor(@InjectModel(BlogBan.name) private blogBanModel: Model<BlogBanDocument>) {}

  async findBanByBlogId(blogId: string) {
    return this.blogBanModel.findOne({ blogId: blogId });
  }
  async countBannedBlogs() {
    return this.blogBanModel.countDocuments({});
  }
  async getBannedBlogs() {
    const bannedUsersCount = await this.countBannedBlogs();
    if (!bannedUsersCount) return [];
    const allBans = await this.blogBanModel.find({}).lean();
    const bannedBlogs = [];
    allBans.forEach((ban) => {
      bannedBlogs.push(ban.blogId);
    });
    const bannedBlogsObjId = bannedBlogs.map((blogId) => new mongoose.Types.ObjectId(blogId));
    return bannedBlogsObjId;
  }
  async getBannedPosts() {
    const bannedUsersCount = await this.countBannedBlogs();
    if (!bannedUsersCount) return [];
    const allBans = await this.blogBanModel.find({}).lean();
    const bannedPosts = [];
    allBans.forEach((ban) => {
      bannedPosts.push(...ban.bannedPostsId);
    });
    const bannedPostsObjId = bannedPosts.map((postId) => new mongoose.Types.ObjectId(postId));
    return bannedPostsObjId;
  }
  async save(instance: any) {
    instance.save();
  }
}
