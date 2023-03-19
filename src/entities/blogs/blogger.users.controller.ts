import { Body, Controller, Get, Param, Put, Query, Res, UseGuards } from '@nestjs/common';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Response } from 'express';
import {
  BannedForBlogUserViewModel,
  BanUserModelForBlog,
  UserParamModel,
} from '../users/userModels';
import { CommandBus } from '@nestjs/cqrs';
import { BanUserForBlogCommand } from './application/use-cases/ban.user.for.blog.use-case';
import { paginatedViewModel } from '../../shared/models/pagination';
import { blogParamModel, blogSAViewModel } from './blogs.models';
import { BloggerBansQueryRepository } from './blogger.bans.query-repository';

@Controller('blogger/users')
export class BloggerUsersController {
  constructor(
    private commandBus: CommandBus,
    protected bloggerQueryRepository: BloggerBansQueryRepository,
  ) {}
  @UseGuards(JwtAccessAuthGuard)
  @Put(':userId/ban')
  async banUser(
    @Param() param: UserParamModel,
    @Body() inputModel: BanUserModelForBlog,
    @Res() res: Response,
  ) {
    await this.commandBus.execute(new BanUserForBlogCommand(param.userId, inputModel));
    return res.sendStatus(204);
  }
  @UseGuards(JwtAccessAuthGuard)
  @Get('/blog/:blogId')
  async getBannedUsers(@Query() paginationQuery, @Param() param: blogParamModel) {
    const returnedUsers: paginatedViewModel<BannedForBlogUserViewModel[]> =
      await this.bloggerQueryRepository.getAllUsers(paginationQuery, param.blogId);
    return returnedUsers;
  }
}
