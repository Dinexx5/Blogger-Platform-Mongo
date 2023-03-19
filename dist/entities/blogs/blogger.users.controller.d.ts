import { Response } from 'express';
import { BannedForBlogUserViewModel, BanUserModelForBlog, UserBanParamModel } from '../users/userModels';
import { CommandBus } from '@nestjs/cqrs';
import { paginatedViewModel } from '../../shared/models/pagination';
import { blogParamModel } from './blogs.models';
import { BloggerBansQueryRepository } from './blogger.bans.query-repository';
export declare class BloggerUsersController {
    private commandBus;
    protected bloggerQueryRepository: BloggerBansQueryRepository;
    constructor(commandBus: CommandBus, bloggerQueryRepository: BloggerBansQueryRepository);
    banUser(userId: any, param: UserBanParamModel, inputModel: BanUserModelForBlog, res: Response): Promise<Response<any, Record<string, any>>>;
    getBannedUsers(userId: any, paginationQuery: any, param: blogParamModel): Promise<paginatedViewModel<BannedForBlogUserViewModel[]>>;
}
