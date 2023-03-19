import { Model } from 'mongoose';
import { CommentDocument } from './comments.schema';
import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { BansRepository } from '../bans/bans.repository';
import { CommentsLikesRepository } from '../likes/comments.likes.repository';
import { CommentViewModel } from './comments.models';
export declare class CommentsQueryRepository {
    protected bansRepository: BansRepository;
    protected commentsLikesRepository: CommentsLikesRepository;
    private commentModel;
    constructor(bansRepository: BansRepository, commentsLikesRepository: CommentsLikesRepository, commentModel: Model<CommentDocument>);
    getAllCommentsForPost(query: paginationQuerys, postId: string, userId?: string | null): Promise<paginatedViewModel<CommentViewModel[]>>;
    countLikesForComments(comments: CommentDocument[], userId?: string): Promise<void>;
    countLikesForComment(comment: CommentDocument, userId?: string): Promise<void>;
    findCommentById(commentId: string, userId?: string | null): Promise<CommentViewModel | null>;
}
