import { User, UserDocument } from './users.schema';
import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userViewModel } from './userModels';

function mapDbUserToUserViewModel(user: UserDocument): userViewModel {
  return {
    id: user._id.toString(),
    login: user.accountData.login,
    email: user.accountData.email,
    createdAt: user.accountData.createdAt,
  };
}
export class UsersQueryRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUsers(query: paginationQuerys): Promise<paginatedViewModel<userViewModel[]>> {
    const {
      sortDirection = 'desc',
      sortBy = 'createdAt',
      pageNumber = 1,
      pageSize = 10,
      searchLoginTerm = null,
      searchEmailTerm = null,
    } = query;
    const sortByFilter = `accountData.${sortBy}`;
    console.log(sortByFilter);
    const sortDirectionInt: 1 | -1 = sortDirection === 'desc' ? -1 : 1;
    const skippedUsersCount = (+pageNumber - 1) * +pageSize;

    const filter = {} as {
      'accountData.login'?: { $regex: string; $options: string };
      'accountData.email'?: { $regex: string; $options: string };
      $or?: [
        { 'accountData.email': { $regex: string; $options: string } },
        { 'accountData.login': { $regex: string; $options: string } },
      ];
    };
    if (searchLoginTerm && !searchEmailTerm) {
      filter['accountData.login'] = { $regex: searchLoginTerm, $options: 'i' };
    }
    if (searchEmailTerm && !searchLoginTerm) {
      filter['accountData.email'] = { $regex: searchEmailTerm, $options: 'i' };
    }
    if (searchLoginTerm && searchEmailTerm) {
      filter.$or = [
        { 'accountData.email': { $regex: searchEmailTerm, $options: 'i' } },
        { 'accountData.login': { $regex: searchLoginTerm, $options: 'i' } },
      ];
    }

    const countAll = await this.userModel.countDocuments(filter);
    const usersDb = await this.userModel
      .find(filter)
      .sort({ [sortByFilter]: sortDirectionInt })
      .skip(skippedUsersCount)
      .limit(+pageSize);

    const usersView = usersDb.map(mapDbUserToUserViewModel);
    return {
      pagesCount: Math.ceil(countAll / +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: countAll,
      items: usersView,
    };
  }
}
