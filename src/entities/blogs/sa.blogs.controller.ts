import { Controller, Get, Param, Put, Query, Res, UseGuards } from '@nestjs/common';
import { paginatedViewModel } from '../../shared/models/pagination';
import { Response } from 'express';
import { blogAndUserParamModel, blogSAViewModel } from './blogs.models';
import { SuperAdminBlogsService } from './sa.blogs.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BlogsSAQueryRepository } from './sa.blog.query-repo';

@Controller('sa/blogs')
export class SuperAdminBlogsController {
  constructor(
    protected superAdminBlogsQueryRepository: BlogsSAQueryRepository,
    protected superAdminBlogService: SuperAdminBlogsService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getBlogs(@Query() paginationQuery) {
    const returnedBlogs: paginatedViewModel<blogSAViewModel[]> =
      await this.superAdminBlogsQueryRepository.getAllBlogs(paginationQuery);
    return returnedBlogs;
  }

  @UseGuards(AuthGuard)
  @Put(':blogId/bind-with-user/:userId')
  async updateBlog(@Param() params: blogAndUserParamModel, @Res() res: Response) {
    await this.superAdminBlogService.UpdateBlogById(params.blogId, params.userId);
    return res.sendStatus(204);
  }
}
