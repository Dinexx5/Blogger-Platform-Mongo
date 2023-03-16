import { paginatedViewModel } from '../../shared/models/pagination';
import { Response } from 'express';
import { blogAndUserParamModel, blogSAViewModel } from './blogs.models';
import { SuperAdminBlogsService } from './sa.blogs.service';
import { BlogsSAQueryRepository } from './sa.blog.query-repo';
export declare class SuperAdminBlogsController {
    protected superAdminBlogsQueryRepository: BlogsSAQueryRepository;
    protected superAdminBlogService: SuperAdminBlogsService;
    constructor(superAdminBlogsQueryRepository: BlogsSAQueryRepository, superAdminBlogService: SuperAdminBlogsService);
    getBlogs(paginationQuery: any): Promise<paginatedViewModel<blogSAViewModel[]>>;
    updateBlog(params: blogAndUserParamModel, res: Response): Promise<Response<any, Record<string, any>>>;
}
