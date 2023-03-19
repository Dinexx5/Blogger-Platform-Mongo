import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ban, BanDocument } from './application/domain/bans.schema';

@Injectable()
export class BansRepository {
  constructor(@InjectModel(Ban.name) private banModel: Model<BanDocument>) {}

  async findBanByUserId(userId: string) {
    return this.banModel.findOne({ userId: userId });
  }
  async countBannedUsers() {
    return this.banModel.countDocuments({});
  }
  async getBannedUsers() {
    const allBans = await this.banModel.find({}).lean();
    const bannedUsers = [];
    allBans.forEach((ban) => {
      bannedUsers.push(ban.userId);
    });
    return bannedUsers;
  }
  async getBannedBlogs() {
    const bannedUsersCount = await this.countBannedUsers();
    if (!bannedUsersCount) return [];
    const allBans = await this.banModel.find({}).lean();
    const bannedBlogs = [];
    allBans.forEach((ban) => {
      bannedBlogs.push(...ban.bannedBlogsId);
    });
    const bannedBlogsObjId = bannedBlogs.map((blogId) => new mongoose.Types.ObjectId(blogId));
    return bannedBlogsObjId;
  }
  async getBannedPosts() {
    const bannedUsersCount = await this.countBannedUsers();
    if (!bannedUsersCount) return [];
    const allBans = await this.banModel.find({}).lean();
    const bannedPosts = [];
    allBans.forEach((ban) => {
      bannedPosts.push(...ban.bannedPostsId);
    });
    const bannedPostsObjId = bannedPosts.map((postId) => new mongoose.Types.ObjectId(postId));
    return bannedPostsObjId;
  }
  async getBannedComments() {
    const bannedUsersCount = await this.countBannedUsers();
    if (!bannedUsersCount) return [];
    const allBans = await this.banModel.find({}).lean();
    const bannedComments = [];
    allBans.forEach((ban) => {
      bannedComments.push(...ban.bannedCommentsId);
    });
    const bannedCommentsObjId = bannedComments.map(
      (commentId) => new mongoose.Types.ObjectId(commentId),
    );
    return bannedCommentsObjId;
  }
  async save(instance: any) {
    instance.save();
  }
}
