import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { PostLike, PostLikeDocument } from './posts.like.schema';
import { BansRepository } from '../bans/bans.repository';

@Injectable()
export class PostsLikesRepository {
  constructor(
    protected bansRepository: BansRepository,
    @InjectModel(PostLike.name) private postLikeModel: Model<PostLikeDocument>,
  ) {}

  async findLikeByPostIdAndUserId(postId: string, userId: string) {
    return this.postLikeModel.findOne({ $and: [{ postId: postId }, { userId: userId }] });
  }
  async findLikesForPost(postId: string) {
    const bannedUsers = await this.bansRepository.getBannedUsers();
    return this.postLikeModel.find({ postId: postId, userId: { $nin: bannedUsers } });
  }
  async findThreeLatestLikes(postId: string) {
    const bannedUsers = await this.bansRepository.getBannedUsers();
    const allLikes = await this.postLikeModel
      .find({ postId: postId, userId: { $nin: bannedUsers } })
      .sort({ createdAt: -1 })
      .lean();
    const threeLatestLikes = allLikes.slice(0, 3);
    const mappedThreeLatestLikes = threeLatestLikes.map((like) => {
      return {
        addedAt: like.createdAt,
        userId: like.userId,
        login: like.login,
      };
    });
    return mappedThreeLatestLikes;
  }
  async save(instance: any) {
    instance.save();
  }
}
