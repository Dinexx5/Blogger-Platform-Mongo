import { Module } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { BansService } from '../bans/bans.service';
import { Ban, BanSchema } from '../bans/bans.schema';
import { BansRepository } from '../bans/bans.repository';
import { BansController } from './bans.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { BlogsModule } from '../blogs/blogs.module';
import { TokensModule } from '../tokens/token.module';
import { DevicesModule } from '../devices/devices.module';
import { PostsModule } from '../posts/posts.module';
import { CommentsModule } from '../comments/comments.module';
import { User, UserSchema } from '../users/users.schema';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    BlogsModule,
    PostsModule,
    CommentsModule,
    TokensModule,
    DevicesModule,
    MongooseModule.forFeature([{ name: Ban.name, schema: BanSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [BansService, BansRepository],
  controllers: [BansController],
  exports: [BansService, BansRepository],
})
export class BansModule {}
