import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class LikesInfo {
  @Prop()
  likesCount: number;
  @Prop()
  dislikesCount: number;
  @Prop()
  myStatus: string;
}

@Schema()
export class PostInfo {
  @Prop()
  id: string;
  @Prop()
  title: string;
  @Prop()
  blogId: string;
  @Prop()
  blogName: string;
}

@Schema()
export class CommentatorModel {
  @Prop()
  userId: string;
  @Prop()
  userLogin: string;
}

@Schema()
export class Comment {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  content: string;
  @Prop()
  commentatorInfo: CommentatorModel;
  @Prop()
  createdAt: string;
  @Prop()
  postInfo: PostInfo;
  @Prop()
  likesInfo: LikesInfo;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
