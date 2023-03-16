import mongoose, { HydratedDocument } from 'mongoose';
export type BanDocument = HydratedDocument<Ban>;
export declare class Ban {
    userId: string;
    login: string;
    isBanned: boolean;
    banReason: string;
    bannedBlogsId: string[];
    bannedPostsId: string[];
    bannedCommentsId: string[];
}
export declare const BanSchema: mongoose.Schema<Ban, mongoose.Model<Ban, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Ban>;
