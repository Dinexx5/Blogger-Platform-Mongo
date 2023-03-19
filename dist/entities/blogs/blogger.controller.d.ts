import { BlogsService } from './blogs.service';
import { createBlogModel, updateBlogModel } from './domain/blogs.schema';
import { Response } from 'express';
import { createPostModel, updatePostModel } from '../posts/posts.schema';
import { PostsService } from '../posts/posts.service';
import { blogAndPostParamModel, blogParamModel, blogViewModel } from './blogs.models';
import { paginatedViewModel } from '../../shared/models/pagination';
import { BlogsQueryRepository } from './blogs.query-repo';
import { BloggerCommentsQueryRepository } from './domain/blogger.comments.query-repo';
import { commentsForBloggerViewModel } from '../comments/comments.models';
export declare class BloggerController {
    protected blogsService: BlogsService;
    protected postsService: PostsService;
    protected blogsQueryRepo: BlogsQueryRepository;
    protected bloggerCommentsQueryRepo: BloggerCommentsQueryRepository;
    constructor(blogsService: BlogsService, postsService: PostsService, blogsQueryRepo: BlogsQueryRepository, bloggerCommentsQueryRepo: BloggerCommentsQueryRepository);
    getBlogs(paginationQuery: any, userId: any): Promise<paginatedViewModel<blogViewModel[]>>;
    getComments(paginationQuery: any, userId: any): Promise<paginatedViewModel<commentsForBloggerViewModel[]>>;
    createBlog(inputModel: createBlogModel, userId: any): Promise<blogViewModel>;
    updateBlog(inputModel: updateBlogModel, params: blogParamModel, res: Response, userId: any): Promise<Response<any, Record<string, any>>>;
    deleteBlog(params: blogParamModel, res: Response, userId: any): Promise<Response<any, Record<string, any>>>;
    createPost(inputModel: createPostModel, params: blogParamModel, res: Response, userId: any): Promise<Response<any, Record<string, any>>>;
    updatePost(inputModel: updatePostModel, params: blogAndPostParamModel, res: Response, userId: any): Promise<Response<any, Record<string, any>>>;
    deletePost(params: blogAndPostParamModel, res: Response, userId: any): Promise<Response<any, Record<string, any>>>;
}
