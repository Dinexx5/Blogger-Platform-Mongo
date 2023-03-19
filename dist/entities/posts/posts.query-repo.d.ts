import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { PostDocument, PostViewModel } from './posts.schema';
import { Model } from 'mongoose';
import { BansRepository } from '../bans/bans.repository';
import { PostsLikesRepository } from '../likes/posts.likes.repository';
import { BlogBansRepository } from '../bans/bans.blogs.repository';
export declare class PostsQueryRepository {
    protected bansRepository: BansRepository;
    protected postsLikesRepository: PostsLikesRepository;
    protected blogBansRepository: BlogBansRepository;
    private postModel;
    constructor(bansRepository: BansRepository, postsLikesRepository: PostsLikesRepository, blogBansRepository: BlogBansRepository, postModel: Model<PostDocument>);
    getAllPosts(query: paginationQuerys, blogId?: string, userId?: string | null): Promise<paginatedViewModel<PostViewModel[]>>;
    countLikesForPosts(posts: PostDocument[], userId?: string): Promise<void>;
    countLikesForPost(post: PostDocument, userId?: string): Promise<void>;
    findPostById(postId: string, userId?: string | null): Promise<PostViewModel | null>;
}
