import { PostsRepository } from './posts.repository';
import { Model } from 'mongoose';
import { createPostModel, PostDocument, PostViewModel, updatePostModel } from './posts.schema';
import { CommentsService } from '../comments/comments.service';
import { UsersRepository } from '../users/users.repository';
import { BlogsRepository } from '../blogs/blogs.repository';
import { PostLikeDocument } from '../likes/posts.like.schema';
import { PostsLikesRepository } from '../likes/posts.likes.repository';
import { UsersBansForBlogRepository } from '../bans/bans.users-for-blog.repository';
import { CommentViewModel, CreateCommentModel } from '../comments/comments.models';
export declare class PostsService {
    protected postsRepository: PostsRepository;
    protected blogsRepository: BlogsRepository;
    protected commentsService: CommentsService;
    protected usersRepository: UsersRepository;
    protected postsLikesRepository: PostsLikesRepository;
    protected usersBansForBlogsRepo: UsersBansForBlogRepository;
    private postModel;
    private postLikeModel;
    constructor(postsRepository: PostsRepository, blogsRepository: BlogsRepository, commentsService: CommentsService, usersRepository: UsersRepository, postsLikesRepository: PostsLikesRepository, usersBansForBlogsRepo: UsersBansForBlogRepository, postModel: Model<PostDocument>, postLikeModel: Model<PostLikeDocument>);
    createPost(postBody: createPostModel, blogId: string, userId: string): Promise<PostViewModel | null>;
    deletePostById(postId: string, blogId: string, userId: string): Promise<void>;
    UpdatePostById(postBody: updatePostModel, postId: string, blogId: string, userId: string): Promise<void>;
    createComment(postId: string, inputModel: CreateCommentModel, userId: string): Promise<CommentViewModel | null>;
    likePost(postId: string, likeStatus: string, userId: string): Promise<boolean>;
}
