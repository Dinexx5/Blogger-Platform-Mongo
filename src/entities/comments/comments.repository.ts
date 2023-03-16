import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './comments.schema';

@Injectable()
export class CommentsRepository {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async findComment(commentId: string) {
    const _id = new mongoose.Types.ObjectId(commentId);
    const commentInstance = await this.commentModel.findOne({ _id: _id });
    return commentInstance;
  }
  async findBannedComments(userId: string) {
    const commentInstances = await this.commentModel
      .find({ 'commentatorInfo.userId': userId })
      .lean();
    const comments = commentInstances.map((comment) => comment._id.toString());
    return comments;
  }

  async save(instance: any) {
    instance.save();
  }
}
