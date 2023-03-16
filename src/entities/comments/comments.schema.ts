import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { IsLikeStatusCorrect } from '../../shared/decorators/validation/like-status.decorator';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class LikingUsers {
  @Prop()
  id: string;
  @Prop()
  myStatus: string;
}

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
  likingUsers: [LikingUsers];
  @Prop()
  postId: string;
  @Prop()
  likesInfo: LikesInfo;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

export class CreateCommentModel {
  @IsString()
  @IsNotEmpty()
  @Length(20, 300)
  @Transform(({ value }) => value?.trim?.())
  content: string;
}
export class LikeInputModel {
  @IsLikeStatusCorrect()
  likeStatus: string;
}

export class CommentViewModel {
  constructor(
    public id: string,
    public content: string,
    public commentatorInfo: {
      userId: string;
      userLogin: string;
    },
    public createdAt: string,
    public likesInfo: {
      likesCount: number;
      dislikesCount: number;
      myStatus: string;
    },
  ) {}
}
