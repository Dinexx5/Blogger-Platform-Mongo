import mongoose, { HydratedDocument } from 'mongoose';
export type CommentDocument = HydratedDocument<Comment>;
export declare class LikesInfo {
    likesCount: number;
    dislikesCount: number;
    myStatus: string;
}
export declare class PostInfo {
    id: string;
    title: string;
    blogId: string;
    blogName: string;
}
export declare class CommentatorModel {
    userId: string;
    userLogin: string;
}
export declare class Comment {
    _id: mongoose.Schema.Types.ObjectId;
    content: string;
    commentatorInfo: CommentatorModel;
    createdAt: string;
    postInfo: PostInfo;
    likesInfo: LikesInfo;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment>;
