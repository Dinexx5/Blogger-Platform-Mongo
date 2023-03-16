import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentLikeDocument = HydratedDocument<CommentLike>;
@Schema()
export class CommentLike {
  @Prop()
  commentId: string;
  @Prop()
  likeStatus: string;
  @Prop()
  userId: string;
  @Prop()
  createdAt: string;
}
export const CommentLikeSchema = SchemaFactory.createForClass(CommentLike);
