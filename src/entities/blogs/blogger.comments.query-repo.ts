import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { BlogsRepository } from './blogs.repository';
import { PostsRepository } from '../posts/posts.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from '../comments/comments.schema';
import { Model } from 'mongoose';
import { commentsForBloggerViewModel } from '../comments/comments.models';

function mapCommentsToViewModel(comment: CommentDocument): commentsForBloggerViewModel {
  return {
    id: comment._id.toString(),
    content: comment.content,
    commentatorInfo: {
      userId: comment.commentatorInfo.userId,
      userLogin: comment.commentatorInfo.userLogin,
    },
    createdAt: comment.createdAt,
    likesInfo: {
      likesCount: comment.likesInfo.likesCount,
      dislikesCount: comment.likesInfo.dislikesCount,
      myStatus: comment.likesInfo.myStatus,
    },
    postInfo: {
      id: comment.postInfo.id,
      title: comment.postInfo.title,
      blogId: comment.postInfo.blogId,
      blogName: comment.postInfo.blogName,
    },
  };
}

export class BloggerCommentsQueryRepository {
  constructor(
    protected blogsRepository: BlogsRepository,
    protected postsRepository: PostsRepository,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async getAllComments(
    query: paginationQuerys,
    userId: string,
  ): Promise<paginatedViewModel<commentsForBloggerViewModel[]>> {
    const { sortDirection = 'desc', sortBy = 'createdAt', pageNumber = 1, pageSize = 10 } = query;
    const sortDirectionInt: 1 | -1 = sortDirection === 'desc' ? -1 : 1;
    const skippedBlogsCount = (+pageNumber - 1) * +pageSize;

    const allBlogs = await this.blogsRepository.findBlogsForUser(userId);
    const allPosts = await this.postsRepository.findPostsForUser(allBlogs);

    const filter = { postId: { $in: allPosts } };

    const countAll = await this.commentModel.countDocuments(filter);
    const comments = await this.commentModel
      .find(filter)
      .sort({ [sortBy]: sortDirectionInt })
      .skip(skippedBlogsCount)
      .limit(+pageSize);

    const commentsView = comments.map(mapCommentsToViewModel);
    return {
      pagesCount: Math.ceil(countAll / +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: countAll,
      items: commentsView,
    };
  }
}
