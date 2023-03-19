import { ICommandHandler } from '@nestjs/cqrs';
import { PostsRepository } from '../../../posts/posts.repository';
import { BlogBanDocument } from '../../../bans/application/domain/bans.schema';
import { Model } from 'mongoose';
import { BanBlogModel } from '../../blogs.models';
import { BlogBansRepository } from '../../../bans/bans.blogs.repository';
import { BlogsRepository } from '../../blogs.repository';
import { BlogDocument } from '../../domain/blogs.schema';
export declare class BanBlogCommand {
    blogId: string;
    inputModel: BanBlogModel;
    constructor(blogId: string, inputModel: BanBlogModel);
}
export declare class BansBlogUseCase implements ICommandHandler<BanBlogCommand> {
    protected blogsRepository: BlogsRepository;
    protected postsRepository: PostsRepository;
    protected blogBansRepository: BlogBansRepository;
    private blogModel;
    private blogBanModel;
    constructor(blogsRepository: BlogsRepository, postsRepository: PostsRepository, blogBansRepository: BlogBansRepository, blogModel: Model<BlogDocument>, blogBanModel: Model<BlogBanDocument>);
    execute(command: BanBlogCommand): Promise<boolean>;
}
