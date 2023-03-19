import { BlogsRepository } from './blogs.repository';
import { BlogDocument, createBlogModel, updateBlogModel } from './domain/blogs.schema';
import { Model } from 'mongoose';
import { UsersRepository } from '../users/users.repository';
import { blogViewModel } from './blogs.models';
export declare class BlogsService {
    protected blogsRepository: BlogsRepository;
    protected usersRepository: UsersRepository;
    private blogModel;
    constructor(blogsRepository: BlogsRepository, usersRepository: UsersRepository, blogModel: Model<BlogDocument>);
    createBlog(inputModel: createBlogModel, userId: string): Promise<blogViewModel>;
    deleteBlogById(blogId: string, userId: string): Promise<void>;
    UpdateBlogById(blogBody: updateBlogModel, blogId: string, userId: string): Promise<void>;
}
