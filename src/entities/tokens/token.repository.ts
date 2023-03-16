import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './token.schema';

@Injectable()
export class TokenRepository {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}

  async findToken(exp: string): Promise<TokenDocument | null> {
    const foundToken = await this.tokenModel.findOne({ expiredAt: exp });
    if (!foundToken) return null;
    return foundToken;
  }
  async deleteTokensForBan(userId: string) {
    const _id = new mongoose.Types.ObjectId(userId);
    return this.tokenModel.deleteMany({ userId: _id });
  }

  async save(instance: any) {
    instance.save();
  }
}
