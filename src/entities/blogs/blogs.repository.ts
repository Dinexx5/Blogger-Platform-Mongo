import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './domain/blogs.schema';

@Injectable()
export class BlogsRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async findBlogInstance(blogId: string) {
    const _id = new mongoose.Types.ObjectId(blogId);
    const blogInstance = await this.blogModel.findOne({ _id: _id });
    return blogInstance;
  }

  async findBlogsForUser(userId: string) {
    const blogsInstances = await this.blogModel.find({ 'blogOwnerInfo.userId': userId }).lean();
    const blogs = blogsInstances.map((blog) => blog._id.toString());
    return blogs;
  }

  async save(instance: any) {
    instance.save();
  }
}
