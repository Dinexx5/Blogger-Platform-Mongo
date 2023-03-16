import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  issuedAt: string;

  @Prop()
  expiredAt: string;

  @Prop()
  deviceId: string;

  @Prop()
  deviceName: string;

  @Prop()
  ip: string;

  @Prop()
  userId: mongoose.Schema.Types.ObjectId;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
