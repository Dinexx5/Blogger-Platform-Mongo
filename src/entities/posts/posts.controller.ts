import { Body, Controller, Get, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { Response } from 'express';
import { PostViewModel } from './posts.schema';
import { PostsService } from './posts.service';
import { PostsQueryRepository } from './posts.query-repo';
import { CommentsQueryRepository } from '../comments/comments.query-repo';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { GetUserGuard } from '../auth/guards/getuser.guard';
import { CommentViewModel, CreateCommentModel, LikeInputModel } from '../comments/comments.models';

@Controller('posts')
export class PostsController {
  constructor(
    protected postsService: PostsService,
    protected postsQueryRepository: PostsQueryRepository,
    protected commentsQueryRepository: CommentsQueryRepository,
  ) {}
  @UseGuards(GetUserGuard)
  @Get()
  async getPosts(@CurrentUser() userId, @Query() paginationQuery) {
    const returnedPosts: paginatedViewModel<PostViewModel[]> =
      await this.postsQueryRepository.getAllPosts(paginationQuery, undefined, userId);

    return returnedPosts;
  }
  @UseGuards(GetUserGuard)
  @Get(':id')
  async getPost(@CurrentUser() userId, @Param('id') id: string, @Res() res: Response) {
    const post: PostViewModel | null = await this.postsQueryRepository.findPostById(id, userId);
    if (!post) {
      return res.sendStatus(404);
    }
    return res.send(post);
  }
  @UseGuards(GetUserGuard)
  @Get(':id/comments')
  async getComments(
    @CurrentUser() userId,
    @Param('id') postId: string,
    @Query() paginationQuery: paginationQuerys,
    @Res() res: Response,
  ) {
    const foundPost: PostViewModel | null = await this.postsQueryRepository.findPostById(postId);
    if (!foundPost) {
      return res.sendStatus(404);
    }
    const returnedComments: paginatedViewModel<CommentViewModel[]> =
      await this.commentsQueryRepository.getAllCommentsForPost(paginationQuery, postId, userId);
    return res.send(returnedComments);
  }
  @UseGuards(JwtAccessAuthGuard)
  @Post(':id/comments')
  async createComment(
    @CurrentUser() userId,
    @Param('id') postId: string,
    @Body() inputModel: CreateCommentModel,
    @Res() res: Response,
  ) {
    console.log(userId);
    const newComment: CommentViewModel = await this.postsService.createComment(
      postId,
      inputModel,
      userId,
    );
    if (!newComment) return res.sendStatus(404);
    return res.status(201).send(newComment);
  }
  @UseGuards(JwtAccessAuthGuard)
  @Put('/:id/like-status')
  async likePost(
    @CurrentUser() userId,
    @Param('id') postId: string,
    @Body() inputModel: LikeInputModel,
    @Res() res: Response,
  ) {
    const isLiked: boolean = await this.postsService.likePost(
      postId,
      inputModel.likeStatus,
      userId,
    );
    if (!isLiked) return res.sendStatus(404);
    return res.sendStatus(204);
  }
}
