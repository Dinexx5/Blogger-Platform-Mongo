import mongoose, { Model } from 'mongoose';
import { Blog, BlogDocument } from './domain/blogs.schema';
export declare class BlogsRepository {
    private blogModel;
    constructor(blogModel: Model<BlogDocument>);
    findBlogInstance(blogId: string): Promise<mongoose.Document<unknown, any, Blog> & Omit<Blog & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    findBlogsForUser(userId: string): Promise<string[]>;
    save(instance: any): Promise<void>;
}
