import mongoose, { HydratedDocument } from 'mongoose';
export type DeviceDocument = HydratedDocument<Device>;
export declare class Device {
    _id: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    ip: string;
    title: string;
    lastActiveDate: string;
    deviceId: string;
}
export declare const DeviceSchema: mongoose.Schema<Device, mongoose.Model<Device, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Device>;
export declare class createDeviceModel {
    userId: mongoose.Schema.Types.ObjectId;
    ip: string;
    title: string;
    deviceId: string;
    lastActiveDate: string;
}
export declare class deviceViewModel {
    ip: string;
    title: string;
    lastActiveDate: string;
    deviceId: string;
}
