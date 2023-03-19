import mongoose, { Model } from 'mongoose';
import { UserForBlogBan, UserForBlogBanDocument } from './application/domain/bans.schema';
export declare class UsersBansForBlogRepository {
    private banUserForBlogModel;
    constructor(banUserForBlogModel: Model<UserForBlogBanDocument>);
    findBanByBlogAndUserId(blogId: string, userId: string): Promise<mongoose.Document<unknown, any, UserForBlogBan> & Omit<UserForBlogBan & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    countBannedUsers(): Promise<number>;
    getBannedPostsForUser(userId: string): Promise<any[]>;
    save(instance: any): Promise<void>;
}
