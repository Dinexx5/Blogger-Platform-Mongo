import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { UserForBlogBan, UserForBlogBanDocument } from '../bans/application/domain/bans.schema';
import { BannedForBlogUserViewModel } from '../users/userModels';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';

function mapFoundBansToViewModel(ban: UserForBlogBanDocument): BannedForBlogUserViewModel {
  return {
    id: ban.userId,
    login: ban.login,
    banInfo: {
      isBanned: ban.isBanned,
      banDate: ban.banDate,
      banReason: ban.banReason,
    },
  };
}

export class BloggerBansQueryRepository {
  constructor(
    protected blogsRepository: BlogsRepository,
    @InjectModel(UserForBlogBan.name) private banUserForBlogModel: Model<UserForBlogBanDocument>,
  ) {}

  async getAllUsers(
    query: paginationQuerys,
    blogId: string,
    userId: string,
  ): Promise<paginatedViewModel<BannedForBlogUserViewModel[]>> {
    const {
      sortDirection = 'desc',
      sortBy = 'createdAt',
      pageNumber = 1,
      pageSize = 10,
      searchNameTerm = null,
    } = query;
    const sortDirectionInt: 1 | -1 = sortDirection === 'desc' ? -1 : 1;
    const skippedBlogsCount = (+pageNumber - 1) * +pageSize;

    const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
    if (!blogInstance) throw new NotFoundException();
    if (blogInstance.blogOwnerInfo.userId !== userId) throw new ForbiddenException();

    const filter = { blogId: blogId } as {
      blogId: string;
      name?: { $regex: string; $options: string };
    };
    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: 'i' };
    }

    const countAll = await this.banUserForBlogModel.countDocuments(filter);
    const bans = await this.banUserForBlogModel
      .find(filter)
      .sort({ [sortBy]: sortDirectionInt })
      .skip(skippedBlogsCount)
      .limit(+pageSize)
      .lean();

    const bansView = bans.map(mapFoundBansToViewModel);
    return {
      pagesCount: Math.ceil(countAll / +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: countAll,
      items: bansView,
    };
  }
}
