import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './domain/blogs.schema';
import { Model } from 'mongoose';
import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { blogSAViewModel } from './blogs.models';

function mapFoundBlogToBlogViewModel(blog: BlogDocument): blogSAViewModel {
  return {
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    isMembership: blog.isMembership,
    createdAt: blog.createdAt,
    id: blog._id.toString(),
    blogOwnerInfo: {
      userId: blog.blogOwnerInfo.userId,
      userLogin: blog.blogOwnerInfo.userLogin,
    },
    banInfo: {
      isBanned: blog.banInfo.isBanned,
      banDate: blog.banInfo.banDate,
    },
  };
}

export class BlogsSAQueryRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async getAllBlogs(query: paginationQuerys): Promise<paginatedViewModel<blogSAViewModel[]>> {
    const {
      sortDirection = 'desc',
      sortBy = 'createdAt',
      pageNumber = 1,
      pageSize = 10,
      searchNameTerm = null,
    } = query;
    const sortDirectionInt: 1 | -1 = sortDirection === 'desc' ? -1 : 1;
    const skippedBlogsCount = (+pageNumber - 1) * +pageSize;

    const filter = {} as {
      name?: { $regex: string; $options: string };
    };
    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: 'i' };
    }

    const countAll = await this.blogModel.countDocuments(filter);
    const blogsDb = await this.blogModel
      .find(filter)
      .sort({ [sortBy]: sortDirectionInt })
      .skip(skippedBlogsCount)
      .limit(+pageSize)
      .lean();

    const blogsView = blogsDb.map(mapFoundBlogToBlogViewModel);
    return {
      pagesCount: Math.ceil(countAll / +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: countAll,
      items: blogsView,
    };
  }
}
