import { BlogDocument } from './blogs.schema';
import { Model } from 'mongoose';
import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { blogSAViewModel } from './blogs.models';
export declare class BlogsSAQueryRepository {
    private blogModel;
    constructor(blogModel: Model<BlogDocument>);
    getAllBlogs(query: paginationQuerys): Promise<paginatedViewModel<blogSAViewModel[]>>;
}
