import { PostsRepository } from './posts.repository';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  createPostModel,
  LikeModel,
  Post,
  PostDocument,
  PostViewModel,
  updatePostModel,
} from './posts.schema';
import { CommentViewModel, CreateCommentModel, LikingUsers } from '../comments/comments.schema';
import { CommentsService } from '../comments/comments.service';
import { UsersRepository } from '../users/users.repository';
import { BlogsRepository } from '../blogs/blogs.repository';
import { PostLike, PostLikeDocument } from '../likes/posts.like.schema';
import { PostsLikesRepository } from '../likes/posts.likes.repository';

@Injectable()
export class PostsService {
  constructor(
    protected postsRepository: PostsRepository,
    protected blogsRepository: BlogsRepository,
    protected commentsService: CommentsService,
    protected usersRepository: UsersRepository,
    protected postsLikesRepository: PostsLikesRepository,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(PostLike.name) private postLikeModel: Model<PostLikeDocument>,
  ) {}

  async createPost(
    postBody: createPostModel,
    blogId: string,
    userId: string,
  ): Promise<PostViewModel | null> {
    const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
    if (!blogInstance) throw new NotFoundException();
    if (blogInstance.blogOwnerInfo.userId !== userId) throw new ForbiddenException();
    const postDTO = {
      _id: new mongoose.Types.ObjectId(),
      title: postBody.title,
      shortDescription: postBody.shortDescription,
      content: postBody.content,
      blogId: blogId,
      blogName: blogInstance!.name,
      createdAt: blogInstance!.createdAt,
      likingUsers: [],
      likes: [],
      extendedLikesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: 'None',
        newestLikes: [],
      },
    };
    const postInstance = new this.postModel(postDTO);
    await this.postsRepository.save(postInstance);

    return {
      id: postInstance._id.toString(),
      title: postInstance.title,
      shortDescription: postInstance.shortDescription,
      content: postInstance.content,
      blogId: postInstance.blogId,
      blogName: postInstance.blogName,
      createdAt: postInstance.createdAt,
      extendedLikesInfo: {
        likesCount: postInstance.extendedLikesInfo.likesCount,
        dislikesCount: postInstance.extendedLikesInfo.dislikesCount,
        myStatus: 'None',
        newestLikes: [],
      },
    };
  }

  async deletePostById(postId: string, blogId: string, userId: string) {
    const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
    if (!blogInstance) throw new NotFoundException();
    if (blogInstance.blogOwnerInfo.userId !== userId) throw new ForbiddenException();
    const postInstance = await this.postsRepository.findPostInstance(postId);
    if (!postInstance) throw new NotFoundException();
    await postInstance.deleteOne();
  }

  async UpdatePostById(postBody: updatePostModel, postId: string, blogId: string, userId: string) {
    const blogInstance = await this.blogsRepository.findBlogInstance(blogId);
    if (!blogInstance) throw new NotFoundException();
    if (blogInstance.blogOwnerInfo.userId !== userId) throw new ForbiddenException();
    const postInstance = await this.postsRepository.findPostInstance(postId);
    if (!postInstance) throw new NotFoundException();
    postInstance.title = postBody.title;
    postInstance.shortDescription = postBody.shortDescription;
    postInstance.content = postBody.content;
    postInstance.blogId = blogId;
    await this.postsRepository.save(postInstance);
  }
  async createComment(
    postId: string,
    inputModel: CreateCommentModel,
    userId: string,
  ): Promise<CommentViewModel | null> {
    const postInstance = await this.postsRepository.findPostInstance(postId);
    if (!postInstance) return null;
    return await this.commentsService.createComment(postId, inputModel, userId);
  }

  async likePost(postId: string, likeStatus: string, userId: string): Promise<boolean> {
    const postInstance = await this.postsRepository.findPostInstance(postId);
    if (!postInstance) {
      return false;
    }
    const userInstance = await this.usersRepository.findUserById(userId);
    const likeInstance = await this.postsLikesRepository.findLikeByPostIdAndUserId(postId, userId);
    if (!likeInstance) {
      const likeDto = {
        postId,
        likeStatus,
        userId,
        login: userInstance.accountData.login,
        createdAt: new Date().toISOString(),
      };
      const newLikeInstance = new this.postLikeModel(likeDto);
      await this.postsLikesRepository.save(newLikeInstance);
      return true;
    }
    likeInstance.likeStatus = likeStatus;
    await this.postsLikesRepository.save(likeInstance);
    // const callbackForUser = (user: LikingUsers) => user.id === userId;
    // const callbackForLike = (user) => user.userId === userId;
    // const isUserLikedBefore = postInstance.likingUsers.find(callbackForUser);
    // if (!isUserLikedBefore) {
    //   postInstance.likingUsers.push({ id: userId, myStatus: 'None' });
    // }
    // const indexOfUser = postInstance.likingUsers.findIndex(callbackForUser);
    // const indexOfLike = postInstance.likes.findIndex(callbackForLike);
    // const myStatus = postInstance.likingUsers.find(callbackForUser)!.myStatus;
    // switch (likeStatus) {
    //   case 'Like':
    //     if (myStatus === 'Like') {
    //       postInstance.likingUsers[indexOfUser].myStatus = 'Like';
    //     }
    //     if (myStatus === 'None') {
    //       ++postInstance!.extendedLikesInfo.likesCount;
    //       postInstance.likingUsers[indexOfUser].myStatus = 'Like';
    //       postInstance.likes.push({
    //         addedAt: new Date().toISOString(),
    //         userId: userId,
    //         login: login,
    //       });
    //     }
    //     if (myStatus === 'Dislike') {
    //       --postInstance!.extendedLikesInfo.dislikesCount;
    //       ++postInstance!.extendedLikesInfo.likesCount;
    //       postInstance.likingUsers[indexOfUser].myStatus = 'Like';
    //       postInstance.likes.push({
    //         addedAt: new Date().toISOString(),
    //         userId: userId,
    //         login: login,
    //       });
    //     }
    //     break;
    //   case 'Dislike':
    //     if (myStatus === 'Like') {
    //       --postInstance!.extendedLikesInfo.likesCount;
    //       ++postInstance!.extendedLikesInfo.dislikesCount;
    //       postInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
    //       postInstance.likes.splice(indexOfLike, 1);
    //     }
    //     if (myStatus === 'None') {
    //       ++postInstance!.extendedLikesInfo.dislikesCount;
    //       postInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
    //     }
    //     if (myStatus === 'Dislike') {
    //       postInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
    //     }
    //     break;
    //   case 'None':
    //     if (myStatus === 'Like') {
    //       --postInstance!.extendedLikesInfo.likesCount;
    //       postInstance.likingUsers[indexOfUser].myStatus = 'None';
    //       postInstance.likes.splice(indexOfLike, 1);
    //     }
    //     if (myStatus === 'Dislike') {
    //       --postInstance!.extendedLikesInfo.dislikesCount;
    //       postInstance.likingUsers[indexOfUser].myStatus = 'None';
    //     }
    //     if (myStatus === 'None') {
    //       postInstance.likingUsers[indexOfUser].myStatus = 'None';
    //     }
    //     break;
    // }
    // postInstance.markModified('likingUsers');
    // await this.postsRepository.save(postInstance);
    return true;
  }
}
