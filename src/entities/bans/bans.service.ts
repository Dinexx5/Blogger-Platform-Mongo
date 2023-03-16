import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BanModel } from '../users/userModels';
import { BansRepository } from './bans.repository';
import { Ban, BanDocument } from './bans.schema';
import { DevicesRepository } from '../devices/devices.repository';
import { TokenRepository } from '../tokens/token.repository';
import { BlogsRepository } from '../blogs/blogs.repository';
import { PostsRepository } from '../posts/posts.repository';
import { CommentsRepository } from '../comments/comments.repository';
import { User, UserDocument } from '../users/users.schema';

@Injectable()
export class BansService {
  constructor(
    protected usersRepository: UsersRepository,
    protected blogsRepository: BlogsRepository,
    protected postsRepository: PostsRepository,
    protected commentsRepository: CommentsRepository,
    protected bansRepository: BansRepository,
    protected devicesRepository: DevicesRepository,
    protected tokensRepository: TokenRepository,
    @InjectModel(Ban.name) private banModel: Model<BanDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async banUser(userId: string, inputModel: BanModel): Promise<boolean> {
    const userInstance = await this.usersRepository.findUserById(userId);
    const login = userInstance.accountData.login;
    if (inputModel.isBanned === true) {
      userInstance.banInfo.isBanned = true;
      userInstance.banInfo.banDate = new Date().toISOString();
      userInstance.banInfo.banReason = inputModel.banReason;
      userInstance.markModified('banInfo');
      await this.usersRepository.save(userInstance);
      await this.devicesRepository.deleteDevicesForBan(userId);
      await this.tokensRepository.deleteTokensForBan(userId);
      const bannedBlogsId = await this.blogsRepository.findBannedBlogs(userId);
      const bannedPostsId = await this.postsRepository.findBannedPosts(bannedBlogsId);
      const bannedCommentsId = await this.commentsRepository.findBannedComments(userId);
      const banDto = {
        userId,
        login,
        ...inputModel,
        bannedBlogsId,
        bannedPostsId,
        bannedCommentsId,
      };
      const banInstance = new this.banModel(banDto);
      await this.bansRepository.save(banInstance);
      return;
    }
    const bananaInstance = await this.bansRepository.findBanByUserId(userId);
    if (!bananaInstance) {
      return;
    }
    userInstance.banInfo.isBanned = false;
    userInstance.markModified('banInfo');
    await this.usersRepository.save(userInstance);
    await bananaInstance.deleteOne();
  }
}
