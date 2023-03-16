import { Response } from 'express';
import { DevicesService } from './devices.service';
import { DevicesRepository } from './devices.repository';
export declare class DevicesController {
    protected devicesService: DevicesService;
    protected devicesRepository: DevicesRepository;
    constructor(devicesService: DevicesService, devicesRepository: DevicesRepository);
    getActiveSessions(userTokenMeta: any, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteAllSessions(userTokenMeta: any, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteSession(userTokenMeta: any, deviceId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
