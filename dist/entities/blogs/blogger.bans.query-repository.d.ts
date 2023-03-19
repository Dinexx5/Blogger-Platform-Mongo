import { Model } from 'mongoose';
import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { UserForBlogBanDocument } from '../bans/application/domain/bans.schema';
import { BannedForBlogUserViewModel } from '../users/userModels';
import { BlogsRepository } from './blogs.repository';
export declare class BloggerBansQueryRepository {
    protected blogsRepository: BlogsRepository;
    private banUserForBlogModel;
    constructor(blogsRepository: BlogsRepository, banUserForBlogModel: Model<UserForBlogBanDocument>);
    getAllUsers(query: paginationQuerys, blogId: string, userId: string): Promise<paginatedViewModel<BannedForBlogUserViewModel[]>>;
}
