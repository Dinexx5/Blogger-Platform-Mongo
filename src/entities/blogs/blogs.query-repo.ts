import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blogs.schema';
import mongoose, { Model } from 'mongoose';
import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { blogViewModel } from './blogs.models';
import { BlogsSAQueryRepository } from './sa.blog.query-repo';
import { BansService } from '../bans/bans.service';
import { BansRepository } from '../bans/bans.repository';

function mapFoundBlogToBlogViewModel(blog: BlogDocument): blogViewModel {
  return {
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    isMembership: blog.isMembership,
    createdAt: blog.createdAt,
    id: blog._id.toString(),
  };
}

export class BlogsQueryRepository {
  constructor(
    protected bansRepository: BansRepository,
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
  ) {}

  async getAllBlogs(
    query: paginationQuerys,
    userId?: string,
  ): Promise<paginatedViewModel<blogViewModel[]>> {
    const {
      sortDirection = 'desc',
      sortBy = 'createdAt',
      pageNumber = 1,
      pageSize = 10,
      searchNameTerm = null,
    } = query;
    const sortDirectionInt: 1 | -1 = sortDirection === 'desc' ? -1 : 1;
    const skippedBlogsCount = (+pageNumber - 1) * +pageSize;
    const bannedBlogs = await this.bansRepository.getBannedBlogs();

    const filter = { _id: { $nin: bannedBlogs } } as {
      _id: { $nin: mongoose.Types.ObjectId[] };
      name?: { $regex: string; $options: string };
      'blogOwnerInfo.userId'?: string;
    };
    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: 'i' };
    }
    if (userId) {
      filter['blogOwnerInfo.userId'] = userId;
    }
    console.log(filter);

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

  async findBlogById(blogId: string): Promise<blogViewModel | null> {
    const _id = new mongoose.Types.ObjectId(blogId);
    const foundBlog: BlogDocument | null = await this.blogModel.findOne({
      _id: _id,
    });
    if (!foundBlog) {
      return null;
    }
    return mapFoundBlogToBlogViewModel(foundBlog);
  }
}
