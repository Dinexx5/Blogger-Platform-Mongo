import mongoose, { Model } from 'mongoose';
import { Ban, BanDocument } from './bans.schema';
export declare class BansRepository {
    private banModel;
    constructor(banModel: Model<BanDocument>);
    findBanByUserId(userId: string): Promise<mongoose.Document<unknown, any, Ban> & Omit<Ban & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    countBannedUsers(): Promise<number>;
    getBannedUsers(): Promise<any[]>;
    getBannedBlogs(): Promise<mongoose.Types.ObjectId[]>;
    getBannedPosts(): Promise<mongoose.Types.ObjectId[]>;
    getBannedComments(): Promise<mongoose.Types.ObjectId[]>;
    save(instance: any): Promise<void>;
}
