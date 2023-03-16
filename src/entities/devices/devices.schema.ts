import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  ip: string;

  @Prop()
  title: string;

  @Prop({ required: true })
  lastActiveDate: string;

  @Prop()
  deviceId: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);

export class createDeviceModel {
  userId: mongoose.Schema.Types.ObjectId;
  ip: string;
  title: string;
  deviceId: string;
  lastActiveDate: string;
}

export class deviceViewModel {
  ip: string;
  title: string;
  lastActiveDate: string;
  deviceId: string;
}
