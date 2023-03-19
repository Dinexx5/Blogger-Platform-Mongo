import { Response } from 'express';
import { BannedForBlogUserViewModel, BanUserModelForBlog, UserParamModel } from '../users/userModels';
import { CommandBus } from '@nestjs/cqrs';
import { paginatedViewModel } from '../../shared/models/pagination';
import { blogParamModel } from './blogs.models';
import { BloggerBansQueryRepository } from './blogger.bans.query-repository';
export declare class BloggerUsersController {
    private commandBus;
    protected bloggerQueryRepository: BloggerBansQueryRepository;
    constructor(commandBus: CommandBus, bloggerQueryRepository: BloggerBansQueryRepository);
    banUser(userId: any, param: UserParamModel, inputModel: BanUserModelForBlog, res: Response): Promise<Response<any, Record<string, any>>>;
    getBannedUsers(paginationQuery: any, param: blogParamModel): Promise<paginatedViewModel<BannedForBlogUserViewModel[]>>;
}
