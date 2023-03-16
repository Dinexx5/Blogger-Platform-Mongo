import { BlogsRepository } from './blogs.repository';
import { BlogDocument } from './blogs.schema';
import { Model } from 'mongoose';
import { UsersRepository } from '../users/users.repository';
export declare class SuperAdminBlogsService {
    protected blogsRepository: BlogsRepository;
    protected usersRepository: UsersRepository;
    private blogModel;
    constructor(blogsRepository: BlogsRepository, usersRepository: UsersRepository, blogModel: Model<BlogDocument>);
    UpdateBlogById(blogId: string, userId: string): Promise<void>;
}
