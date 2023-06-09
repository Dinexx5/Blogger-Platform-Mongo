import { Body, Controller, Get, Param, Put, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Response } from 'express';
import {
  BannedForBlogUserViewModel,
  BanUserModelForBlog,
  UserBanParamModel,
} from '../users/userModels';
import { CommandBus } from '@nestjs/cqrs';
import { BanUserForBlogCommand } from './application/use-cases/ban.user.for.blog.use-case';
import { paginatedViewModel } from '../../shared/models/pagination';
import { blogParamModel } from './blogs.models';
import { BloggerBansQueryRepository } from './blogger.bans.query-repository';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';

@Controller('blogger/users')
export class BloggerUsersController {
  constructor(
    private commandBus: CommandBus,
    protected bloggerQueryRepository: BloggerBansQueryRepository,
  ) {}
  @UseGuards(JwtAccessAuthGuard)
  @Put(':userId/ban')
  async banUser(
    @CurrentUser() userId,
    @Param() param: UserBanParamModel,
    @Body() inputModel: BanUserModelForBlog,
    @Res() res: Response,
  ) {
    await this.commandBus.execute(new BanUserForBlogCommand(param.userId, inputModel, userId));
    return res.sendStatus(204);
  }
  @UseGuards(JwtAccessAuthGuard)
  @Get('/blog/:blogId')
  async getBannedUsers(
    @CurrentUser() userId,
    @Query() paginationQuery,
    @Param() param: blogParamModel,
  ) {
    const returnedUsers: paginatedViewModel<BannedForBlogUserViewModel[]> =
      await this.bloggerQueryRepository.getAllUsers(paginationQuery, param.blogId, userId);
    return returnedUsers;
  }
}
