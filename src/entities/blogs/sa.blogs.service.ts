import { BlogsRepository } from './blogs.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './domain/blogs.schema';
import { Model } from 'mongoose';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class SuperAdminBlogsService {
  constructor(
    protected blogsRepository: BlogsRepository,
    protected usersRepository: UsersRepository,
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
  ) {}
  async UpdateBlogById(blogId: string, userId: string) {
    const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
    const userInstance = await this.usersRepository.findUserById(userId);
    blogInstance.blogOwnerInfo.userId = userId;
    blogInstance.blogOwnerInfo.userLogin = userInstance.accountData.login;
    blogInstance.markModified('blogOwnerInfo');
    await this.blogsRepository.save(blogInstance);
  }
}
