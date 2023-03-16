import mongoose, { Model } from 'mongoose';
import { PostLike, PostLikeDocument } from './posts.like.schema';
import { BansRepository } from '../bans/bans.repository';
export declare class PostsLikesRepository {
    protected bansRepository: BansRepository;
    private postLikeModel;
    constructor(bansRepository: BansRepository, postLikeModel: Model<PostLikeDocument>);
    findLikeByPostIdAndUserId(postId: string, userId: string): Promise<mongoose.Document<unknown, any, PostLike> & Omit<PostLike & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    findLikesForPost(postId: string): Promise<(mongoose.Document<unknown, any, PostLike> & Omit<PostLike & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>)[]>;
    findThreeLatestLikes(postId: string): Promise<{
        addedAt: string;
        userId: string;
        login: string;
    }[]>;
    save(instance: any): Promise<void>;
}
