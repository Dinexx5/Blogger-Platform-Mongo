import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BanDocument = HydratedDocument<Ban>;
export type BlogBanDocument = HydratedDocument<BlogBan>;
export type UserForBlogBanDocument = HydratedDocument<UserForBlogBan>;

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
@Schema()
export class BlogBan {
  @Prop()
  isBanned: boolean;

  @Prop()
  blogId: string;

  @Prop()
  bannedPostsId: string[];
}

@Schema()
export class UserForBlogBan {
  @Prop()
  userId: string;

  @Prop()
  login: string;

  @Prop()
  blogId: string;

  @Prop()
  isBanned: boolean;

  @Prop()
  banReason: string;

  @Prop()
  bannedPostsId: string[];

  @Prop()
  banDate: string;
}

export const BanSchema = SchemaFactory.createForClass(Ban);
export const BlogBanSchema = SchemaFactory.createForClass(BlogBan);
export const BanUserForBlogSchema = SchemaFactory.createForClass(UserForBlogBan);
