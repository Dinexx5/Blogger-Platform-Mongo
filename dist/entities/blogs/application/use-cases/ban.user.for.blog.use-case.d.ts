import { UsersRepository } from '../../../users/users.repository';
import { Model } from 'mongoose';
import { BanUserModelForBlog } from '../../../users/userModels';
import { BlogsRepository } from '../../../blogs/blogs.repository';
import { PostsRepository } from '../../../posts/posts.repository';
import { UserDocument } from '../../../users/users.schema';
import { ICommandHandler } from '@nestjs/cqrs';
import { UserForBlogBanDocument } from '../../../bans/application/domain/bans.schema';
import { UsersBansForBlogRepository } from '../../../bans/bans.users-for-blog.repository';
export declare class BanUserForBlogCommand {
    userId: string;
    inputModel: BanUserModelForBlog;
    ownerId: string;
    constructor(userId: string, inputModel: BanUserModelForBlog, ownerId: string);
}
export declare class BanUserForBlogUseCase implements ICommandHandler<BanUserForBlogCommand> {
    protected usersRepository: UsersRepository;
    protected postsRepository: PostsRepository;
    protected blogsRepository: BlogsRepository;
    protected usersBansForBlogsRepository: UsersBansForBlogRepository;
    private banUserForBlogModel;
    private userModel;
    constructor(usersRepository: UsersRepository, postsRepository: PostsRepository, blogsRepository: BlogsRepository, usersBansForBlogsRepository: UsersBansForBlogRepository, banUserForBlogModel: Model<UserForBlogBanDocument>, userModel: Model<UserDocument>);
    execute(command: BanUserForBlogCommand): Promise<boolean>;
}
