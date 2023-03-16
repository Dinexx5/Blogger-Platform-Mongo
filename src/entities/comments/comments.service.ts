import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Comment,
  CommentDocument,
  CommentViewModel,
  CreateCommentModel,
  LikingUsers,
} from './comments.schema';
import { CommentsRepository } from './comments.repository';
import { UsersRepository } from '../users/users.repository';
import { CommentLike, CommentLikeDocument } from '../likes/comments.like.schema';
import { CommentsLikesRepository } from '../likes/comments.likes.repository';

@Injectable()
export class CommentsService {
  constructor(
    protected commentsRepository: CommentsRepository,
    protected usersRepository: UsersRepository,
    protected commentsLikesRepository: CommentsLikesRepository,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(CommentLike.name) private commentLikeModel: Model<CommentLikeDocument>,
  ) {}
  filter: { status: string } = { status: '204' };
  async createComment(
    postId: string,
    inputModel: CreateCommentModel,
    userId: string,
  ): Promise<CommentViewModel> {
    const userInstance = await this.usersRepository.findUserById(userId);
    const commentDTO = {
      _id: new mongoose.Types.ObjectId(),
      content: inputModel.content,
      commentatorInfo: {
        userId: userInstance._id.toString(),
        userLogin: userInstance.accountData.login,
      },
      createdAt: new Date().toISOString(),
      likingUsers: [],
      postId: postId,
      likesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: 'None',
      },
    };
    const commentInstance = new this.commentModel(commentDTO);
    await this.commentsRepository.save(commentInstance);
    return {
      id: commentInstance._id.toString(),
      content: commentInstance.content,
      commentatorInfo: {
        userId: commentInstance.commentatorInfo.userId,
        userLogin: commentInstance.commentatorInfo.userLogin,
      },
      createdAt: commentInstance.createdAt,
      likesInfo: {
        likesCount: commentInstance.likesInfo.likesCount,
        dislikesCount: commentInstance.likesInfo.dislikesCount,
        myStatus: 'None',
      },
    };
  }
  async updateCommentById(commentId: string, inputModel: CreateCommentModel, userId: string) {
    const commentInstance = await this.commentsRepository.findComment(commentId);
    if (!commentInstance) {
      this.filter.status = '404';
      return this.filter.status;
    }
    if (commentInstance.commentatorInfo.userId !== userId) {
      this.filter.status = '403';
      return this.filter.status;
    }
    commentInstance.content = inputModel.content;
    await this.commentsRepository.save(commentInstance);
    this.filter.status = '204';
    return this.filter.status;
  }

  async deleteCommentById(commentId: string, userId: string) {
    const commentInstance = await this.commentsRepository.findComment(commentId);
    if (!commentInstance) {
      this.filter.status = '404';
      return this.filter.status;
    }
    if (commentInstance.commentatorInfo.userId !== userId) {
      this.filter.status = '403';
      return this.filter.status;
    }
    await commentInstance.deleteOne();
    this.filter.status = '204';
    return this.filter.status;
  }

  async likeComment(commentId: string, likeStatus: string, userId: string): Promise<boolean> {
    const commentInstance = await this.commentsRepository.findComment(commentId);
    if (!commentInstance) {
      return false;
    }
    const likeInstance = await this.commentsLikesRepository.findLikeByCommentIdAndUserId(
      commentId,
      userId,
    );
    if (!likeInstance) {
      const likeDto = {
        commentId,
        likeStatus,
        userId,
        createdAt: new Date().toISOString(),
      };
      const newLikeInstance = new this.commentLikeModel(likeDto);
      await this.commentsLikesRepository.save(newLikeInstance);
      return true;
    }
    likeInstance.likeStatus = likeStatus;
    await this.commentsLikesRepository.save(likeInstance);
    // const callback = (user: LikingUsers) => user.id === userId;
    // const isUserLikedBefore = commentInstance.likingUsers.find(callback);
    // if (!isUserLikedBefore) {
    //   commentInstance.likingUsers.push({ id: userId, myStatus: 'None' });
    // }
    // const indexOfUser = commentInstance.likingUsers.findIndex(callback);
    // const myStatus = commentInstance.likingUsers.find(callback)!.myStatus;
    // switch (likeStatus) {
    //   case 'Like':
    //     if (myStatus === 'Like') {
    //       commentInstance.likingUsers[indexOfUser].myStatus = 'Like';
    //     }
    //     if (myStatus === 'None') {
    //       ++commentInstance!.likesInfo.likesCount;
    //       commentInstance.likingUsers[indexOfUser].myStatus = 'Like';
    //     }
    //     if (myStatus === 'Dislike') {
    //       --commentInstance!.likesInfo.dislikesCount;
    //       ++commentInstance!.likesInfo.likesCount;
    //       commentInstance.likingUsers[indexOfUser].myStatus = 'Like';
    //     }
    //     break;
    //   case 'Dislike':
    //     if (myStatus === 'Like') {
    //       --commentInstance!.likesInfo.likesCount;
    //       ++commentInstance!.likesInfo.dislikesCount;
    //       commentInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
    //     }
    //     if (myStatus === 'None') {
    //       ++commentInstance!.likesInfo.dislikesCount;
    //       commentInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
    //     }
    //     if (myStatus === 'Dislike') {
    //       commentInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
    //     }
    //     break;
    //   case 'None':
    //     if (myStatus === 'Like') {
    //       --commentInstance!.likesInfo.likesCount;
    //       commentInstance.likingUsers[indexOfUser].myStatus = 'None';
    //     }
    //     if (myStatus === 'Dislike') {
    //       --commentInstance!.likesInfo.dislikesCount;
    //       commentInstance.likingUsers[indexOfUser].myStatus = 'None';
    //     }
    //     if (myStatus === 'None') {
    //       commentInstance.likingUsers[indexOfUser].myStatus = 'None';
    //     }
    //     break;
    // }
    // commentInstance.markModified('likingUsers');
    // await this.commentsRepository.save(commentInstance);
    return true;
  }
}
