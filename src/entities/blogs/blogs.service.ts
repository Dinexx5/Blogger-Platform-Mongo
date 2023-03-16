import { BlogsRepository } from './blogs.repository';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument, createBlogModel, updateBlogModel } from './blogs.schema';
import mongoose, { Model } from 'mongoose';
import { UsersRepository } from '../users/users.repository';
import { blogViewModel } from './blogs.models';

@Injectable()
export class BlogsService {
  constructor(
    protected blogsRepository: BlogsRepository,
    protected usersRepository: UsersRepository,
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
  ) {}

  async createBlog(inputModel: createBlogModel, userId: string): Promise<blogViewModel> {
    const userInstance = await this.usersRepository.findUserById(userId);
    const blogDTO = {
      _id: new mongoose.Types.ObjectId(),
      name: inputModel.name,
      description: inputModel.description,
      isMembership: false,
      websiteUrl: inputModel.websiteUrl,
      createdAt: new Date().toISOString(),
      blogOwnerInfo: { userId: userId, userLogin: userInstance.accountData.login },
    };
    const blogInstance = new this.blogModel(blogDTO);
    await this.blogsRepository.save(blogInstance);

    return {
      name: blogInstance.name,
      description: blogInstance.description,
      websiteUrl: blogInstance.websiteUrl,
      isMembership: blogInstance.isMembership,
      createdAt: blogInstance.createdAt,
      id: blogInstance._id.toString(),
    };
  }
  async deleteBlogById(blogId: string, userId: string) {
    const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
    if (!blogInstance) throw new NotFoundException();
    if (blogInstance.blogOwnerInfo.userId !== userId) throw new ForbiddenException();
    await blogInstance.deleteOne();
  }

  async UpdateBlogById(blogBody: updateBlogModel, blogId: string, userId: string) {
    const { name, description, websiteUrl } = blogBody;
    const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
    if (!blogInstance) throw new NotFoundException();
    if (blogInstance.blogOwnerInfo.userId !== userId) throw new ForbiddenException();
    blogInstance.name = name;
    blogInstance.description = description;
    blogInstance.websiteUrl = websiteUrl;
    await this.blogsRepository.save(blogInstance);
  }
}
