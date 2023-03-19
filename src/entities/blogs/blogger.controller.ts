import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { createBlogModel, updateBlogModel } from './domain/blogs.schema';
import { Response } from 'express';
import { createPostModel, updatePostModel } from '../posts/posts.schema';
import { PostsService } from '../posts/posts.service';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-auth.guard';
import { blogAndPostParamModel, blogParamModel, blogViewModel } from './blogs.models';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { paginatedViewModel } from '../../shared/models/pagination';
import { BlogsQueryRepository } from './blogs.query-repo';
import { BloggerCommentsQueryRepository } from './blogger.comments.query-repo';
import { commentsForBloggerViewModel } from '../comments/comments.models';

@Controller('blogger/blogs')
export class BloggerController {
  constructor(
    protected blogsService: BlogsService,
    protected postsService: PostsService,
    protected blogsQueryRepo: BlogsQueryRepository,
    protected bloggerCommentsQueryRepo: BloggerCommentsQueryRepository,
  ) {}
  @UseGuards(JwtAccessAuthGuard)
  @Get()
  async getBlogs(@Query() paginationQuery, @CurrentUser() userId) {
    const returnedBlogs: paginatedViewModel<blogViewModel[]> =
      await this.blogsQueryRepo.getAllBlogs(paginationQuery, userId);
    return returnedBlogs;
  }
  @UseGuards(JwtAccessAuthGuard)
  @Get('/comments')
  async getComments(@Query() paginationQuery, @CurrentUser() userId) {
    const returnedComments: paginatedViewModel<commentsForBloggerViewModel[]> =
      await this.bloggerCommentsQueryRepo.getAllComments(paginationQuery, userId);
    return returnedComments;
  }
  @UseGuards(JwtAccessAuthGuard)
  @Post()
  async createBlog(@Body() inputModel: createBlogModel, @CurrentUser() userId) {
    const createdInstance: blogViewModel = await this.blogsService.createBlog(inputModel, userId);
    return createdInstance;
  }
  @UseGuards(JwtAccessAuthGuard)
  @Put(':blogId')
  async updateBlog(
    @Body() inputModel: updateBlogModel,
    @Param() params: blogParamModel,
    @Res() res: Response,
    @CurrentUser() userId,
  ) {
    await this.blogsService.UpdateBlogById(inputModel, params.blogId, userId);
    return res.sendStatus(204);
  }
  @UseGuards(JwtAccessAuthGuard)
  @Delete(':blogId')
  async deleteBlog(@Param() params: blogParamModel, @Res() res: Response, @CurrentUser() userId) {
    await this.blogsService.deleteBlogById(params.blogId, userId);
    return res.sendStatus(204);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Post(':blogId/posts')
  async createPost(
    @Body() inputModel: createPostModel,
    @Param() params: blogParamModel,
    @Res() res: Response,
    @CurrentUser() userId,
  ) {
    const post = await this.postsService.createPost(inputModel, params.blogId, userId);
    return res.send(post);
  }
  @UseGuards(JwtAccessAuthGuard)
  @Put(':blogId/posts/:postId')
  async updatePost(
    @Body() inputModel: updatePostModel,
    @Param() params: blogAndPostParamModel,
    @Res() res: Response,
    @CurrentUser() userId,
  ) {
    await this.postsService.UpdatePostById(inputModel, params.postId, params.blogId, userId);
    return res.sendStatus(204);
  }
  @UseGuards(JwtAccessAuthGuard)
  @Delete(':blogId/posts/:postId')
  async deletePost(
    @Param() params: blogAndPostParamModel,
    @Res() res: Response,
    @CurrentUser() userId,
  ) {
    await this.postsService.deletePostById(params.postId, params.blogId, userId);
    return res.sendStatus(204);
  }
}
