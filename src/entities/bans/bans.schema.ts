import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BanDocument = HydratedDocument<Ban>;

@Schema()
export class Ban {
  @Prop()
  userId: string;

  @Prop()
  login: string;

  @Prop()
  isBanned: boolean;

  @Prop()
  banReason: string;

  @Prop()
  bannedBlogsId: string[];

  @Prop()
  bannedPostsId: string[];

  @Prop()
  bannedCommentsId: string[];
}

export const BanSchema = SchemaFactory.createForClass(Ban);
