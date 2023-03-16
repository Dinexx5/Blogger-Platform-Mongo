import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from '@nestjs/common';

import { paginatedViewModel, paginationQuerysSA } from '../../shared/models/pagination';
import { Response } from 'express';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserModel, userViewModel } from './userModels';
import { SaUsersQueryRepository } from './sa.users.query-repo';

@Controller('sa/users')
export class UsersSAController {
  constructor(
    protected usersService: UsersService,
    protected saUsersQueryRepository: SaUsersQueryRepository,
  ) {}
  @UseGuards(AuthGuard)
  @Get()
  async getUsers(@Query() paginationQuerysSA) {
    const returnedUsers: paginatedViewModel<userViewModel[]> =
      await this.saUsersQueryRepository.getAllUsers(paginationQuerysSA);
    return returnedUsers;
  }
  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() inputModel: CreateUserModel) {
    const createdInstance: userViewModel = await this.usersService.createUser(inputModel);
    return createdInstance;
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    const isDeleted = await this.usersService.deleteUserById(id);
    if (!isDeleted) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  }
}
