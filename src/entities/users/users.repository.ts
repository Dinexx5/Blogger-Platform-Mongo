import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserById(userId: string) {
    const _id = new mongoose.Types.ObjectId(userId);
    const userInstance = await this.userModel.findOne({ _id: _id });
    return userInstance;
  }
  async findUserByConfirmationCode(code: string) {
    const userInstance = await this.userModel.findOne({
      'emailConfirmation.confirmationCode': code,
    });
    return userInstance;
  }
  async findUserByRecoveryCode(code: string) {
    const userInstance = await this.userModel.findOne({
      'passwordRecovery.recoveryCode': code,
    });
    return userInstance;
  }
  async findUserByLoginOrEmail(loginOrEmail: string) {
    const userInstance = await this.userModel.findOne({
      $or: [{ 'accountData.email': loginOrEmail }, { 'accountData.login': loginOrEmail }],
    });
    return userInstance;
  }
  async save(instance: any) {
    instance.save();
  }
}
