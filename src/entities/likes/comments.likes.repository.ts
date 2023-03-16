import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CommentLike, CommentLikeDocument } from './comments.like.schema';
import { BansRepository } from '../bans/bans.repository';

@Injectable()
export class CommentsLikesRepository {
  constructor(
    protected bansRepository: BansRepository,
    @InjectModel(CommentLike.name) private commentLikeModel: Model<CommentLikeDocument>,
  ) {}

  async findLikeByCommentIdAndUserId(commentId: string, userId: string) {
    return this.commentLikeModel.findOne({ $and: [{ commentId: commentId }, { userId: userId }] });
  }
  async findLikesForComment(commentId: string) {
    const bannedUsers = await this.bansRepository.getBannedUsers();
    return this.commentLikeModel.find({ commentId: commentId, userId: { $nin: bannedUsers } });
  }
  async save(instance: any) {
    instance.save();
  }
}
