import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { BlogsQueryRepository } from './blogs.query-repo';
import { PostsQueryRepository } from '../posts/posts.query-repo';
import { paginatedViewModel } from '../../shared/models/pagination';
import { Response } from 'express';
import { GetUserGuard } from '../auth/guards/getuser.guard';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { PostViewModel } from '../posts/posts.schema';
import { blogViewModel } from './blogs.models';

@Controller('blogs')
export class BlogsController {
  constructor(
    protected blogsQueryRepository: BlogsQueryRepository,
    protected postsQueryRepository: PostsQueryRepository,
  ) {}

  @Get()
  async getBlogs(@Query() paginationQuery) {
    const returnedBlogs: paginatedViewModel<blogViewModel[]> =
      await this.blogsQueryRepository.getAllBlogs(paginationQuery);
    return returnedBlogs;
  }
  @Get(':id')
  async getBlog(@Param('id') id: string, @Res() res: Response) {
    const blog: blogViewModel | null = await this.blogsQueryRepository.findBlogById(id);
    if (!blog) {
      return res.sendStatus(404);
    }
    return res.send(blog);
  }
  @UseGuards(GetUserGuard)
  @Get(':id/posts')
  async getPosts(
    @CurrentUser() userId,
    @Param('id') blogId: string,
    @Query() paginationQuery,
    @Res() res: Response,
  ) {
    const blog = await this.blogsQueryRepository.findBlogById(blogId);
    if (!blog) return res.sendStatus(404);
    const returnedPosts: paginatedViewModel<PostViewModel[]> =
      await this.postsQueryRepository.getAllPosts(paginationQuery, blogId, userId);
    return res.send(returnedPosts);
  }
}
