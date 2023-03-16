import mongoose, { Model } from 'mongoose';
import { Comment, CommentDocument } from './comments.schema';
export declare class CommentsRepository {
    private commentModel;
    constructor(commentModel: Model<CommentDocument>);
    findComment(commentId: string): Promise<mongoose.Document<unknown, any, Comment> & Omit<Comment & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    findBannedComments(userId: string): Promise<string[]>;
    save(instance: any): Promise<void>;
}
