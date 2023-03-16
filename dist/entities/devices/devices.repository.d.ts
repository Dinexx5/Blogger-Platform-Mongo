import mongoose, { Model } from 'mongoose';
import { Device, DeviceDocument } from './devices.schema';
export declare class DevicesRepository {
    private deviceModel;
    constructor(deviceModel: Model<DeviceDocument>);
    findDeviceById(deviceId: string): Promise<mongoose.Document<unknown, any, Device> & Omit<Device & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    findSessions(userId: string): Promise<(mongoose.Document<unknown, any, Device> & Omit<Device & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>)[]>;
    deleteDevicesForBan(userId: string): Promise<import("mongodb").DeleteResult>;
    deleteAllSessionsWithoutActive(deviceId: string, userId: mongoose.Types.ObjectId): Promise<void>;
    findSessionByDeviceId(deviceId: string): Promise<mongoose.Document<unknown, any, Device> & Omit<Device & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never> & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    save(instance: any): Promise<void>;
}
