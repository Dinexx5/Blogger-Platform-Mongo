import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Ban,
  BanDocument,
  BlogBan,
  BlogBanDocument,
  UserForBlogBan,
  UserForBlogBanDocument,
} from './application/domain/bans.schema';

@Injectable()
export class UsersBansForBlogRepository {
  constructor(
    @InjectModel(UserForBlogBan.name) private banUserForBlogModel: Model<UserForBlogBanDocument>,
  ) {}

  async findBanByBlogAndUserId(blogId: string, userId: string) {
    return this.banUserForBlogModel.findOne({ $and: [{ blogId: blogId }, { userId: userId }] });
  }
  async countBannedUsers() {
    return this.banUserForBlogModel.countDocuments({});
  }
  async getBannedPostsForUser(userId: string) {
    const bannedUsersCount = await this.countBannedUsers();
    if (!bannedUsersCount) return [];
    const allBansForUser = await this.banUserForBlogModel.find({ userId: userId }).lean();
    const forbiddenPosts = [];
    allBansForUser.forEach((ban) => {
      forbiddenPosts.push(...ban.bannedPostsId);
    });
    return forbiddenPosts;
  }
  async save(instance: any) {
    instance.save();
  }
}
