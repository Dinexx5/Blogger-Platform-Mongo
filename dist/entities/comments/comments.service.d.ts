import { Model } from 'mongoose';
import { CommentDocument, CommentViewModel, CreateCommentModel } from './comments.schema';
import { CommentsRepository } from './comments.repository';
import { UsersRepository } from '../users/users.repository';
import { CommentLikeDocument } from '../likes/comments.like.schema';
import { CommentsLikesRepository } from '../likes/comments.likes.repository';
export declare class CommentsService {
    protected commentsRepository: CommentsRepository;
    protected usersRepository: UsersRepository;
    protected commentsLikesRepository: CommentsLikesRepository;
    private commentModel;
    private commentLikeModel;
    constructor(commentsRepository: CommentsRepository, usersRepository: UsersRepository, commentsLikesRepository: CommentsLikesRepository, commentModel: Model<CommentDocument>, commentLikeModel: Model<CommentLikeDocument>);
    filter: {
        status: string;
    };
    createComment(postId: string, inputModel: CreateCommentModel, userId: string): Promise<CommentViewModel>;
    updateCommentById(commentId: string, inputModel: CreateCommentModel, userId: string): Promise<string>;
    deleteCommentById(commentId: string, userId: string): Promise<string>;
    likeComment(commentId: string, likeStatus: string, userId: string): Promise<boolean>;
}
