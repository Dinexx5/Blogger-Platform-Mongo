import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blogs.schema';
import { BloggerController } from './blogger.controller';
import { BlogsService } from './blogs.service';
import { BlogsRepository } from './blogs.repository';
import { BlogsQueryRepository } from './blogs.query-repo';
import { IsBlogExistsDecorator } from '../../shared/decorators/validation/blog-exists.decorator';
import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';
import { BlogsController } from './blogs.controller';
import { UsersModule } from '../users/users.module';
import { SuperAdminBlogsController } from './sa.blogs.controller';
import { SuperAdminBlogsService } from './sa.blogs.service';
import { IsUserExistsDecorator } from '../../shared/decorators/validation/user-exists.decorator';
import { BlogsSAQueryRepository } from './sa.blog.query-repo';
import { BansService } from '../bans/bans.service';
import { CommentsModule } from '../comments/comments.module';
import { BansRepository } from '../bans/bans.repository';
import { DevicesModule } from '../devices/devices.module';
import { TokensModule } from '../tokens/token.module';
import { Ban, BanSchema } from '../bans/bans.schema';
import { User, UserSchema } from '../users/users.schema';

@Module({
  imports: [
    AuthModule,
    PostsModule,
    UsersModule,
    CommentsModule,
    DevicesModule,
    TokensModule,
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Ban.name, schema: BanSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    BlogsService,
    BlogsRepository,
    BlogsQueryRepository,
    IsBlogExistsDecorator,
    IsUserExistsDecorator,
    SuperAdminBlogsService,
    BlogsSAQueryRepository,
    BansService,
    BansRepository,
  ],
  controllers: [BloggerController, BlogsController, SuperAdminBlogsController],
  exports: [BlogsService, BlogsRepository, BlogsQueryRepository, SuperAdminBlogsService],
})
export class BlogsModule {}
