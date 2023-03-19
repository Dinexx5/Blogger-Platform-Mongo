import mongoose, { Model } from 'mongoose';
import { BlogBan, BlogBanDocument } from './application/domain/bans.schema';
export declare class BlogBansRepository {
    private blogBanModel;
    constructor(blogBanModel: Model<BlogBanDocument>);
    findBanByBlogId(blogId: string): Promise<mongoose.Document<unknown, any, BlogBan> & Omit<BlogBan & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    countBannedBlogs(): Promise<number>;
    getBannedBlogs(): Promise<mongoose.Types.ObjectId[]>;
    getBannedPosts(): Promise<mongoose.Types.ObjectId[]>;
    save(instance: any): Promise<void>;
}
