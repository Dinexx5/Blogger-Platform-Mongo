import { Body, Controller, Param, Put, Res, UseGuards } from '@nestjs/common';
import { BansService } from './bans.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BanModel, UserParamModel } from '../users/userModels';
import { Response } from 'express';

@Controller('sa/users')
export class BansController {
  constructor(protected bansService: BansService) {}
  @UseGuards(AuthGuard)
  @Put(':userId/ban')
  async banUser(
    @Param() param: UserParamModel,
    @Body() inputModel: BanModel,
    @Res() res: Response,
  ) {
    await this.bansService.banUser(param.userId, inputModel);
    return res.sendStatus(204);
  }
}
