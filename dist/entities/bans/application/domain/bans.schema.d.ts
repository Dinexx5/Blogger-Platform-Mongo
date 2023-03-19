import mongoose, { HydratedDocument } from 'mongoose';
export type BanDocument = HydratedDocument<Ban>;
export type BlogBanDocument = HydratedDocument<BlogBan>;
export type UserForBlogBanDocument = HydratedDocument<UserForBlogBan>;
export declare class Ban {
    userId: string;
    login: string;
    isBanned: boolean;
    banReason: string;
    bannedBlogsId: string[];
    bannedPostsId: string[];
    bannedCommentsId: string[];
}
export declare class BlogBan {
    isBanned: boolean;
    blogId: string;
    bannedPostsId: string[];
}
export declare class UserForBlogBan {
    userId: string;
    login: string;
    blogId: string;
    isBanned: boolean;
    banReason: string;
    bannedPostsId: string[];
    banDate: string;
}
export declare const BanSchema: mongoose.Schema<Ban, mongoose.Model<Ban, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Ban>;
export declare const BlogBanSchema: mongoose.Schema<BlogBan, mongoose.Model<BlogBan, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, BlogBan>;
export declare const BanUserForBlogSchema: mongoose.Schema<UserForBlogBan, mongoose.Model<UserForBlogBan, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserForBlogBan>;
