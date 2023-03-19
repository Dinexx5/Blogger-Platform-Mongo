import { UsersRepository } from '../../../users/users.repository';
import { Model } from 'mongoose';
import { BanModel } from '../../../users/userModels';
import { BansRepository } from '../../bans.repository';
import { BanDocument } from '../domain/bans.schema';
import { DevicesRepository } from '../../../devices/devices.repository';
import { TokenRepository } from '../../../tokens/token.repository';
import { BlogsRepository } from '../../../blogs/blogs.repository';
import { PostsRepository } from '../../../posts/posts.repository';
import { CommentsRepository } from '../../../comments/comments.repository';
import { UserDocument } from '../../../users/users.schema';
import { ICommandHandler } from '@nestjs/cqrs';
export declare class BansUserCommand {
    userId: string;
    inputModel: BanModel;
    constructor(userId: string, inputModel: BanModel);
}
export declare class BansUserUseCase implements ICommandHandler<BansUserCommand> {
    protected usersRepository: UsersRepository;
    protected blogsRepository: BlogsRepository;
    protected postsRepository: PostsRepository;
    protected commentsRepository: CommentsRepository;
    protected bansRepository: BansRepository;
    protected devicesRepository: DevicesRepository;
    protected tokensRepository: TokenRepository;
    private banModel;
    private userModel;
    constructor(usersRepository: UsersRepository, blogsRepository: BlogsRepository, postsRepository: PostsRepository, commentsRepository: CommentsRepository, bansRepository: BansRepository, devicesRepository: DevicesRepository, tokensRepository: TokenRepository, banModel: Model<BanDocument>, userModel: Model<UserDocument>);
    execute(command: BansUserCommand): Promise<boolean>;
}
