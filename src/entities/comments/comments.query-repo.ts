import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Comment, CommentDocument } from './comments.schema';
import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { BansRepository } from '../bans/bans.repository';
import { CommentsLikesRepository } from '../likes/comments.likes.repository';
import { CommentViewModel } from './comments.models';

function mapperToCommentViewModel(comment: CommentDocument): CommentViewModel {
  return {
    id: comment._id.toString(),
    content: comment.content,
    commentatorInfo: {
      userId: comment.commentatorInfo.userId,
      userLogin: comment.commentatorInfo.userLogin,
    },
    createdAt: comment.createdAt,
    likesInfo: {
      likesCount: comment.likesInfo.likesCount,
      dislikesCount: comment.likesInfo.dislikesCount,
      myStatus: comment.likesInfo.myStatus,
    },
  };
}

export class CommentsQueryRepository {
  constructor(
    protected bansRepository: BansRepository,
    protected commentsLikesRepository: CommentsLikesRepository,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}
  async getAllCommentsForPost(
    query: paginationQuerys,
    postId: string,
    userId?: string | null,
  ): Promise<paginatedViewModel<CommentViewModel[]>> {
    const { sortDirection = 'desc', sortBy = 'createdAt', pageNumber = 1, pageSize = 10 } = query;

    const sortDirectionNumber: 1 | -1 = sortDirection === 'desc' ? -1 : 1;
    const skippedCommentsNumber = (+pageNumber - 1) * +pageSize;
    const bannedComments = await this.bansRepository.getBannedComments();

    const filter = { postId: postId, _id: { $nin: bannedComments } };

    const countAll = await this.commentModel.countDocuments(filter);
    const commentsDb = await this.commentModel
      .find(filter)
      .sort({ [sortBy]: sortDirectionNumber })
      .skip(skippedCommentsNumber)
      .limit(+pageSize);

    await this.countLikesForComments(commentsDb, userId);

    const commentsView = commentsDb.map(mapperToCommentViewModel);
    return {
      pagesCount: Math.ceil(countAll / +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: countAll,
      items: commentsView,
    };
  }
  async countLikesForComments(comments: CommentDocument[], userId?: string) {
    for (const comment of comments) {
      const foundLikes = await this.commentsLikesRepository.findLikesForComment(
        comment.id.toString(),
      );
      if (userId) {
        const likeOfUser = foundLikes.find((like) => like.userId === userId);
        const likeStatus = likeOfUser.likeStatus;
        comment.likesInfo.myStatus = likeStatus;
      }
      const likesCount = foundLikes.filter((like) => like.likeStatus === 'Like').length;
      const dislikesCount = foundLikes.filter((like) => like.likeStatus === 'Dislike').length;
      comment.likesInfo.likesCount = likesCount;
      comment.likesInfo.dislikesCount = dislikesCount;
    }
  }
  async countLikesForComment(comment: CommentDocument, userId?: string) {
    const foundLikes = await this.commentsLikesRepository.findLikesForComment(
      comment.id.toString(),
    );
    if (userId) {
      const likeOfUser = foundLikes.find((like) => like.userId === userId);
      const likeStatus = likeOfUser.likeStatus;
      comment.likesInfo.myStatus = likeStatus;
    }
    const likesCount = foundLikes.filter((like) => like.likeStatus === 'Like').length;
    const dislikesCount = foundLikes.filter((like) => like.likeStatus === 'Dislike').length;
    comment.likesInfo.likesCount = likesCount;
    comment.likesInfo.dislikesCount = dislikesCount;
  }

  async findCommentById(
    commentId: string,
    userId?: string | null,
  ): Promise<CommentViewModel | null> {
    const _id = new mongoose.Types.ObjectId(commentId);
    const bannedComments = await this.bansRepository.getBannedComments();
    const bannedCommentsStrings = bannedComments.map((commentId) => commentId.toString());
    const foundComment: CommentDocument | null = await this.commentModel.findOne({ _id: _id });
    if (!foundComment) {
      return null;
    }
    if (bannedCommentsStrings.includes(foundComment._id.toString())) {
      return null;
    }
    await this.countLikesForComment(foundComment, userId);
    return mapperToCommentViewModel(foundComment);
  }
}
