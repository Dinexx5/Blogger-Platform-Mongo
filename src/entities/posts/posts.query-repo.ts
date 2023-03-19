import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { newestLikes, Post, PostDocument, PostViewModel } from './posts.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { BansRepository } from '../bans/bans.repository';
import { PostsLikesRepository } from '../likes/posts.likes.repository';
import { BlogBansRepository } from '../bans/bans.blogs.repository';

function mapperToPostViewModel(post: PostDocument): PostViewModel {
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt,
    extendedLikesInfo: {
      likesCount: post.extendedLikesInfo.likesCount,
      dislikesCount: post.extendedLikesInfo.dislikesCount,
      myStatus: post.extendedLikesInfo.myStatus,
      newestLikes: post.extendedLikesInfo.newestLikes,
    },
  };
}

export class PostsQueryRepository {
  constructor(
    protected bansRepository: BansRepository,
    protected postsLikesRepository: PostsLikesRepository,
    protected blogBansRepository: BlogBansRepository,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}
  async getAllPosts(
    query: paginationQuerys,
    blogId?: string,
    userId?: string | null,
  ): Promise<paginatedViewModel<PostViewModel[]>> {
    const { sortDirection = 'desc', sortBy = 'createdAt', pageNumber = 1, pageSize = 10 } = query;

    const sortDirectionNumber: 1 | -1 = sortDirection === 'desc' ? -1 : 1;
    const skippedPostsNumber = (+pageNumber - 1) * +pageSize;
    const bannedPostsFromUsers = await this.bansRepository.getBannedPosts();
    const bannedPosts = await this.blogBansRepository.getBannedPosts();
    const allBannedPosts = bannedPosts.concat(bannedPostsFromUsers);

    const filter = { _id: { $nin: allBannedPosts } } as {
      _id: { $nin: mongoose.Types.ObjectId[] };
      blogId?: { $regex: string };
    };
    if (blogId) {
      filter.blogId = { $regex: blogId };
    }

    const countAll = await this.postModel.countDocuments(filter);

    const postsDb = await this.postModel
      .find(filter)
      .sort({
        [sortBy]: sortDirectionNumber,
        title: sortDirectionNumber,
        id: sortDirectionNumber,
      })
      .skip(skippedPostsNumber)
      .limit(+pageSize);
    await this.countLikesForPosts(postsDb, userId);

    const postsView = postsDb.map(mapperToPostViewModel);
    return {
      pagesCount: Math.ceil(countAll / +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: countAll,
      items: postsView,
    };
  }
  async countLikesForPosts(posts: PostDocument[], userId?: string) {
    for (const post of posts) {
      const foundLikes = await this.postsLikesRepository.findLikesForPost(post.id.toString());
      const threeLatestLikes = await this.postsLikesRepository.findThreeLatestLikes(
        post.id.toString(),
      );
      if (userId) {
        const likeOfUser = foundLikes.find((like) => like.userId === userId);
        const likeStatus = likeOfUser.likeStatus;
        post.extendedLikesInfo.myStatus = likeStatus;
      }
      const likesCount = foundLikes.filter((like) => like.likeStatus === 'Like').length;
      const dislikesCount = foundLikes.filter((like) => like.likeStatus === 'Dislike').length;
      post.extendedLikesInfo.likesCount = likesCount;
      post.extendedLikesInfo.dislikesCount = dislikesCount;
      const newestLikes: newestLikes[] = [];
      newestLikes.push(...threeLatestLikes);
      post.extendedLikesInfo.newestLikes = newestLikes;
    }
  }
  async countLikesForPost(post: PostDocument, userId?: string) {
    const foundLikes = await this.postsLikesRepository.findLikesForPost(post.id.toString());
    const threeLatestLikes = await this.postsLikesRepository.findThreeLatestLikes(
      post.id.toString(),
    );
    if (userId) {
      const likeOfUser = foundLikes.find((like) => like.userId === userId);
      const likeStatus = likeOfUser.likeStatus;
      post.extendedLikesInfo.myStatus = likeStatus;
    }
    const likesCount = foundLikes.filter((like) => like.likeStatus === 'Like').length;
    const dislikesCount = foundLikes.filter((like) => like.likeStatus === 'Dislike').length;
    post.extendedLikesInfo.likesCount = likesCount;
    post.extendedLikesInfo.dislikesCount = dislikesCount;
    const newestLikes: newestLikes[] = [];
    newestLikes.push(...threeLatestLikes);
    post.extendedLikesInfo.newestLikes = newestLikes;
  }

  async findPostById(postId: string, userId?: string | null): Promise<PostViewModel | null> {
    const _id = new mongoose.Types.ObjectId(postId);
    const bannedPostsFromUsers = await this.bansRepository.getBannedPosts();
    const bannedPosts = await this.blogBansRepository.getBannedPosts();
    const allBannedPosts = bannedPosts.concat(bannedPostsFromUsers);
    const bannedPostsStrings = allBannedPosts.map((postId) => postId.toString());
    const foundPost: PostDocument | null = await this.postModel.findOne({
      _id: _id,
    });
    if (!foundPost) {
      return null;
    }
    if (bannedPostsStrings.includes(foundPost._id.toString())) {
      return null;
    }
    await this.countLikesForPost(foundPost, userId);
    return mapperToPostViewModel(foundPost);
  }
}
