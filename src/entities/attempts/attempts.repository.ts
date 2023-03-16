import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attempt, AttemptDocument } from './attempts.schema';

@Injectable()
export class AttemptsRepository {
  constructor(@InjectModel(Attempt.name) private attemptModel: Model<AttemptDocument>) {}
  async addNewAttempt(requestData: string, date: string) {
    const newAttemptDto = {
      _id: new ObjectId(),
      requestData: requestData,
      date: date,
    };
    const attemptInstance = new this.attemptModel(newAttemptDto);
    await attemptInstance.save();
  }
  async countAttempts(requestData: string, tenSecondsAgo: string) {
    return this.attemptModel.countDocuments({
      requestData: requestData,
      date: { $gte: tenSecondsAgo },
    });
  }
}
