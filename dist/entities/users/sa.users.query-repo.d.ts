import { UserDocument } from './users.schema';
import { paginatedViewModel, paginationQuerysSA } from '../../shared/models/pagination';
import { Model } from 'mongoose';
import { userViewModel } from './userModels';
export declare class SaUsersQueryRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getAllUsers(query: paginationQuerysSA): Promise<paginatedViewModel<userViewModel[]>>;
}
