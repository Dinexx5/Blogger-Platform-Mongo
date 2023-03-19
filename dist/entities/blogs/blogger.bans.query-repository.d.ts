import { Model } from 'mongoose';
import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { UserForBlogBanDocument } from '../bans/application/domain/bans.schema';
import { BannedForBlogUserViewModel } from '../users/userModels';
export declare class BloggerBansQueryRepository {
    private banUserForBlogModel;
    constructor(banUserForBlogModel: Model<UserForBlogBanDocument>);
    getAllUsers(query: paginationQuerys, blogId: string): Promise<paginatedViewModel<BannedForBlogUserViewModel[]>>;
}
