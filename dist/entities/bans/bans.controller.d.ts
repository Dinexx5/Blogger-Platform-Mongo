import { BansService } from './bans.service';
import { BanModel, UserParamModel } from '../users/userModels';
import { Response } from 'express';
export declare class BansController {
    protected bansService: BansService;
    constructor(bansService: BansService);
    banUser(param: UserParamModel, inputModel: BanModel, res: Response): Promise<Response<any, Record<string, any>>>;
}
