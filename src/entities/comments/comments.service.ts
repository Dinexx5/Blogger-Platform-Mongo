import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Comment, CommentDocument } from './comments.schema';
import { CommentsRepository } from './comments.repository';
import { UsersRepository } from '../users/users.repository';
import { CommentLike, CommentLikeDocument } from '../likes/comments.like.schema';
import { CommentsLikesRepository } from '../likes/comments.likes.repository';
import { CommentViewModel, CreateCommentModel } from './comments.models';
import { PostsRepository } from '../posts/posts.repository';

@Injectable()
export class CommentsService {
  constructor(
    protected commentsRepository: CommentsRepository,
    protected postsRepository: PostsRepository,
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
    const postInstance = await this.postsRepository.findPostInstance(postId);
    const commentDTO = {
      _id: new mongoose.Types.ObjectId(),
      content: inputModel.content,
      commentatorInfo: {
        userId: userInstance._id.toString(),
        userLogin: userInstance.accountData.login,
      },
      createdAt: new Date().toISOString(),
      postInfo: {
        id: postId,
        title: postInstance.title,
        blogId: postInstance.blogId,
        blogName: postInstance.blogName,
      },
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
    return true;
  }
}
