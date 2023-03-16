import { Injectable } from '@nestjs/common';
import mongoose, { Model, ObjectId } from 'mongoose';
import { DevicesRepository } from './devices.repository';
import { Device, DeviceDocument, deviceViewModel } from './devices.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DevicesService {
  constructor(
    protected devicesRepository: DevicesRepository,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}
  filter: { status: string } = { status: '204' };
  async createDevice(
    userId: ObjectId,
    ip: string,
    deviceName: string,
    deviceId: string,
    issuedAt: string,
  ) {
    const deviceDTO = {
      _id: new mongoose.Types.ObjectId(),
      userId: userId,
      ip: ip,
      title: deviceName,
      deviceId: deviceId,
      lastActiveDate: issuedAt,
    };
    const deviceInstance = new this.deviceModel(deviceDTO);
    await this.devicesRepository.save(deviceInstance);
  }
  async findActiveDevices(userId: string): Promise<deviceViewModel[]> {
    const foundDevices = await this.devicesRepository.findSessions(userId);
    return foundDevices.map((device: DeviceDocument) => ({
      ip: device.ip,
      title: device.title,
      lastActiveDate: device.lastActiveDate,
      deviceId: device.deviceId,
    }));
  }
  async deleteSessionById(userId: mongoose.Types.ObjectId, deviceId: string) {
    const foundDevice = await this.devicesRepository.findSessionByDeviceId(deviceId);
    if (!foundDevice) {
      this.filter.status = '404';
      return this.filter.status;
    }
    if (foundDevice.userId.toString() !== userId.toString()) {
      this.filter.status = '403';
      return this.filter.status;
    }
    await foundDevice.deleteOne();
    this.filter.status = '204';
    return this.filter.status;
  }
}
