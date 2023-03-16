import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post, PostDocument } from './posts.schema';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findPostInstance(postId: string) {
    const _id = new mongoose.Types.ObjectId(postId);
    const postInstance = await this.postModel.findOne({ _id: _id });
    return postInstance;
  }
  async findBannedPosts(bannedBlogs: string[]) {
    const postInstances = await this.postModel.find({ blogId: { $in: bannedBlogs } }).lean();
    const posts = postInstances.map((post) => post._id.toString());
    return posts;
  }

  async save(instance: any) {
    instance.save();
  }
}
