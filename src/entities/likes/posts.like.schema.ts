import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostLikeDocument = HydratedDocument<PostLike>;
@Schema()
export class PostLike {
  @Prop()
  postId: string;
  @Prop()
  likeStatus: string;
  @Prop()
  userId: string;
  @Prop()
  login: string;
  @Prop()
  createdAt: string;
}
export const PostLikeSchema = SchemaFactory.createForClass(PostLike);
