import { BlogDocument } from './domain/blogs.schema';
import { Model } from 'mongoose';
import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { blogViewModel } from './blogs.models';
import { BansRepository } from '../bans/bans.repository';
import { BlogBansRepository } from '../bans/bans.blogs.repository';
export declare class BlogsQueryRepository {
    protected bansRepository: BansRepository;
    protected blogBansRepository: BlogBansRepository;
    private blogModel;
    constructor(bansRepository: BansRepository, blogBansRepository: BlogBansRepository, blogModel: Model<BlogDocument>);
    getAllBlogs(query: paginationQuerys, userId?: string): Promise<paginatedViewModel<blogViewModel[]>>;
    findBlogById(blogId: string): Promise<blogViewModel | null>;
}
