import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { BlogsRepository } from './blogs.repository';
import { PostsRepository } from '../posts/posts.repository';
import { CommentDocument } from '../comments/comments.schema';
import { Model } from 'mongoose';
import { commentsForBloggerViewModel } from '../comments/comments.models';
export declare class BloggerCommentsQueryRepository {
    protected blogsRepository: BlogsRepository;
    protected postsRepository: PostsRepository;
    private commentModel;
    constructor(blogsRepository: BlogsRepository, postsRepository: PostsRepository, commentModel: Model<CommentDocument>);
    getAllComments(query: paginationQuerys, userId: string): Promise<paginatedViewModel<commentsForBloggerViewModel[]>>;
}
