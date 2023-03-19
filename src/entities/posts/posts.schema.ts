import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsBlogAttached } from '../../shared/decorators/validation/blog-bound.decorator';
import { Transform } from 'class-transformer';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class LikingUsers {
  @Prop()
  id: string;
  @Prop()
  myStatus: string;
}

@Schema()
export class newestLikes {
  @Prop()
  addedAt: string;
  @Prop()
  userId: string;
  @Prop()
  login: string;
}

@Schema()
export class ExtendedLikesInfo {
  @Prop()
  likesCount: number;
  @Prop()
  dislikesCount: number;
  @Prop()
  myStatus: string;
  @Prop()
  newestLikes: newestLikes[];
}

@Schema()
export class LikeModel {
  @Prop()
  addedAt: string;
  @Prop()
  userId: string;
  @Prop()
  login: string;
}

@Schema()
export class Post {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  shortDescription: string;
  @Prop({ required: true })
  content: string;
  @Prop()
  blogId: string;
  @Prop()
  blogName: string;
  @Prop()
  createdAt: string;
  @Prop()
  likingUsers: [LikingUsers];
  @Prop()
  likes: [LikeModel];
  @Prop()
  extendedLikesInfo: ExtendedLikesInfo;
}

export const PostSchema = SchemaFactory.createForClass(Post);

export class createPostModel {
  @IsString()
  @IsNotEmpty()
  @Length(0, 30)
  @Transform(({ value }) => value?.trim?.())
  title: string;
  @IsString()
  @IsNotEmpty()
  @Length(0, 100)
  @Transform(({ value }) => value?.trim?.())
  shortDescription: string;
  @IsString()
  @IsNotEmpty()
  @Length(0, 1000)
  @Transform(({ value }) => value?.trim?.())
  content: string;
}

export class updatePostModel {
  @IsString()
  @IsNotEmpty()
  @Length(0, 30)
  @Transform(({ value }) => value?.trim?.())
  title: string;
  @IsString()
  @IsNotEmpty()
  @Length(0, 100)
  @Transform(({ value }) => value?.trim?.())
  shortDescription: string;
  @IsString()
  @IsNotEmpty()
  @Length(0, 1000)
  @Transform(({ value }) => value?.trim?.())
  content: string;
}

export class PostViewModel {
  constructor(
    public id: string,
    public title: string,
    public shortDescription: string,
    public content: string,
    public blogId: string,
    public blogName: string,
    public createdAt: string,
    public extendedLikesInfo: {
      likesCount: number;
      dislikesCount: number;
      myStatus: string;
      newestLikes: LikeModel[];
    },
  ) {}
}
