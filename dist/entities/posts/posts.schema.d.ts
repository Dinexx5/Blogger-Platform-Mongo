import mongoose, { HydratedDocument } from 'mongoose';
export type PostDocument = HydratedDocument<Post>;
export declare class LikingUsers {
    id: string;
    myStatus: string;
}
export declare class newestLikes {
    addedAt: string;
    userId: string;
    login: string;
}
export declare class ExtendedLikesInfo {
    likesCount: number;
    dislikesCount: number;
    myStatus: string;
    newestLikes: newestLikes[];
}
export declare class LikeModel {
    addedAt: string;
    userId: string;
    login: string;
}
export declare class Post {
    _id: mongoose.Schema.Types.ObjectId;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
    likingUsers: [LikingUsers];
    likes: [LikeModel];
    extendedLikesInfo: ExtendedLikesInfo;
}
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Post>;
export declare class createPostModel {
    title: string;
    shortDescription: string;
    content: string;
}
export declare class updatePostModel {
    title: string;
    shortDescription: string;
    content: string;
}
export declare class PostViewModel {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
    extendedLikesInfo: {
        likesCount: number;
        dislikesCount: number;
        myStatus: string;
        newestLikes: LikeModel[];
    };
    constructor(id: string, title: string, shortDescription: string, content: string, blogId: string, blogName: string, createdAt: string, extendedLikesInfo: {
        likesCount: number;
        dislikesCount: number;
        myStatus: string;
        newestLikes: LikeModel[];
    });
}
