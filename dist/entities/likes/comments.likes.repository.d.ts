import mongoose, { Model } from 'mongoose';
import { CommentLike, CommentLikeDocument } from './comments.like.schema';
import { BansRepository } from '../bans/bans.repository';
export declare class CommentsLikesRepository {
    protected bansRepository: BansRepository;
    private commentLikeModel;
    constructor(bansRepository: BansRepository, commentLikeModel: Model<CommentLikeDocument>);
    findLikeByCommentIdAndUserId(commentId: string, userId: string): Promise<mongoose.Document<unknown, any, CommentLike> & Omit<CommentLike & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    findLikesForComment(commentId: string): Promise<(mongoose.Document<unknown, any, CommentLike> & Omit<CommentLike & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>)[]>;
    save(instance: any): Promise<void>;
}
