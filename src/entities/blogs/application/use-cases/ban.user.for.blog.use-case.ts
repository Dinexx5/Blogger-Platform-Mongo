import { UsersRepository } from '../../../users/users.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BanUserModelForBlog } from '../../../users/userModels';
import { BlogsRepository } from '../../../blogs/blogs.repository';
import { PostsRepository } from '../../../posts/posts.repository';
import { User, UserDocument } from '../../../users/users.schema';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  UserForBlogBan,
  UserForBlogBanDocument,
} from '../../../bans/application/domain/bans.schema';
import { UsersBansForBlogRepository } from '../../../bans/bans.users-for-blog.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

export class BanUserForBlogCommand {
  constructor(
    public userId: string,
    public inputModel: BanUserModelForBlog,
    public ownerId: string,
  ) {}
}

@CommandHandler(BanUserForBlogCommand)
export class BanUserForBlogUseCase implements ICommandHandler<BanUserForBlogCommand> {
  constructor(
    protected usersRepository: UsersRepository,
    protected postsRepository: PostsRepository,
    protected blogsRepository: BlogsRepository,
    protected usersBansForBlogsRepository: UsersBansForBlogRepository,
    @InjectModel(UserForBlogBan.name) private banUserForBlogModel: Model<UserForBlogBanDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async execute(command: BanUserForBlogCommand): Promise<boolean> {
    const ownerId = command.ownerId;
    const userId = command.userId;
    const inputModel = command.inputModel;
    const blogInstance = await this.blogsRepository.findBlogInstance(inputModel.blogId);
    if (!blogInstance) throw new NotFoundException();
    if (blogInstance.blogOwnerInfo.userId !== ownerId) throw new ForbiddenException();
    const userInstance = await this.usersRepository.findUserById(userId);
    if (!userInstance) throw new NotFoundException();
    const login = userInstance.accountData.login;
    if (inputModel.isBanned === true) {
      const isBannedBefore = await this.usersBansForBlogsRepository.findBanByBlogAndUserId(
        inputModel.blogId,
        userId,
      );
      if (isBannedBefore) return;
      const bannedPostsId = await this.postsRepository.findPostsForUser([inputModel.blogId]);
      const banDto = {
        userId,
        login,
        ...inputModel,
        bannedPostsId,
        banDate: new Date().toISOString(),
      };
      const banInstance = new this.banUserForBlogModel(banDto);
      await this.usersBansForBlogsRepository.save(banInstance);
      return;
    }
    const bananaInstance = await this.usersBansForBlogsRepository.findBanByBlogAndUserId(
      inputModel.blogId,
      userId,
    );
    if (!bananaInstance) {
      return;
    }
    await bananaInstance.deleteOne();
  }
}
