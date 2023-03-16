import mongoose, { Model, ObjectId } from 'mongoose';
import { DevicesRepository } from './devices.repository';
import { DeviceDocument, deviceViewModel } from './devices.schema';
export declare class DevicesService {
    protected devicesRepository: DevicesRepository;
    private deviceModel;
    constructor(devicesRepository: DevicesRepository, deviceModel: Model<DeviceDocument>);
    filter: {
        status: string;
    };
    createDevice(userId: ObjectId, ip: string, deviceName: string, deviceId: string, issuedAt: string): Promise<void>;
    findActiveDevices(userId: string): Promise<deviceViewModel[]>;
    deleteSessionById(userId: mongoose.Types.ObjectId, deviceId: string): Promise<string>;
}
