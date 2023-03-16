import { BlogDocument } from './blogs.schema';
import { Model } from 'mongoose';
import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { blogViewModel } from './blogs.models';
import { BansRepository } from '../bans/bans.repository';
export declare class BlogsQueryRepository {
    protected bansRepository: BansRepository;
    private blogModel;
    constructor(bansRepository: BansRepository, blogModel: Model<BlogDocument>);
    getAllBlogs(query: paginationQuerys, userId?: string): Promise<paginatedViewModel<blogViewModel[]>>;
    findBlogById(blogId: string): Promise<blogViewModel | null>;
}
