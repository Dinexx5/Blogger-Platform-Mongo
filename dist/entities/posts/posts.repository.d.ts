import mongoose, { Model } from 'mongoose';
import { Post, PostDocument } from './posts.schema';
export declare class PostsRepository {
    private postModel;
    constructor(postModel: Model<PostDocument>);
    findPostInstance(postId: string): Promise<mongoose.Document<unknown, any, Post> & Omit<Post & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    findPostsForUser(bannedBlogs: string[]): Promise<string[]>;
    save(instance: any): Promise<void>;
}
