import { BlogsQueryRepository } from './blogs.query-repo';
import { PostsQueryRepository } from '../posts/posts.query-repo';
import { paginatedViewModel } from '../../shared/models/pagination';
import { Response } from 'express';
import { blogViewModel } from './blogs.models';
export declare class BlogsController {
    protected blogsQueryRepository: BlogsQueryRepository;
    protected postsQueryRepository: PostsQueryRepository;
    constructor(blogsQueryRepository: BlogsQueryRepository, postsQueryRepository: PostsQueryRepository);
    getBlogs(paginationQuery: any): Promise<paginatedViewModel<blogViewModel[]>>;
    getBlog(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getPosts(userId: any, blogId: string, paginationQuery: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
