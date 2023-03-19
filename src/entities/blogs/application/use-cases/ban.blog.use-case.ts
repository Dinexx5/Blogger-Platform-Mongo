import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostsRepository } from '../../../posts/posts.repository';
import { InjectModel } from '@nestjs/mongoose';
import { BlogBan, BlogBanDocument } from '../../../bans/application/domain/bans.schema';
import { Model } from 'mongoose';
import { BanBlogModel } from '../../blogs.models';
import { BlogBansRepository } from '../../../bans/bans.blogs.repository';
import { BlogsRepository } from '../../blogs.repository';
import { Blog, BlogDocument } from '../../domain/blogs.schema';

export class BanBlogCommand {
  constructor(public blogId: string, public inputModel: BanBlogModel) {}
}

@CommandHandler(BanBlogCommand)
export class BansBlogUseCase implements ICommandHandler<BanBlogCommand> {
  constructor(
    protected blogsRepository: BlogsRepository,
    protected postsRepository: PostsRepository,
    protected blogBansRepository: BlogBansRepository,
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(BlogBan.name) private blogBanModel: Model<BlogBanDocument>,
  ) {}
  async execute(command: BanBlogCommand): Promise<boolean> {
    const blogId = command.blogId;
    const inputModel = command.inputModel;
    const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
    if (inputModel.isBanned === true) {
      const isBannedBefore = await this.blogBansRepository.findBanByBlogId(blogId);
      if (isBannedBefore) return;
      blogInstance.banInfo.isBanned = true;
      blogInstance.banInfo.banDate = new Date().toISOString();
      blogInstance.markModified('banInfo');
      await this.blogsRepository.save(blogInstance);
      const bannedPostsId = await this.postsRepository.findPostsForUser([blogId]);
      const banDto = {
        blogId,
        ...inputModel,
        bannedPostsId,
      };
      const banInstance = new this.blogBanModel(banDto);
      await this.blogBansRepository.save(banInstance);
      return;
    }
    const bananaInstance = await this.blogBansRepository.findBanByBlogId(blogId);
    if (!bananaInstance) {
      return;
    }
    blogInstance.banInfo.isBanned = false;
    blogInstance.banInfo.banDate = null;
    await this.blogsRepository.save(blogInstance);
    await bananaInstance.deleteOne();
  }
}
