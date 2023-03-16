import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AttemptDocument = HydratedDocument<Attempt>;

@Schema()
export class Attempt {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  requestData: string;

  @Prop()
  date: string;
}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
