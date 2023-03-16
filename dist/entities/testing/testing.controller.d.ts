import { BlogDocument } from '../blogs/blogs.schema';
import { Response } from 'express';
import { Model } from 'mongoose';
import { PostDocument } from '../posts/posts.schema';
import { UserDocument } from '../users/users.schema';
import { CommentDocument } from '../comments/comments.schema';
import { AttemptDocument } from '../attempts/attempts.schema';
import { TokenDocument } from '../tokens/token.schema';
import { DeviceDocument } from '../devices/devices.schema';
import { BanDocument } from '../bans/bans.schema';
export declare class TestingController {
    private blogModel;
    private postModel;
    private userModel;
    private commentModel;
    private attemptModel;
    private tokenModel;
    private deviceModel;
    private banModel;
    constructor(blogModel: Model<BlogDocument>, postModel: Model<PostDocument>, userModel: Model<UserDocument>, commentModel: Model<CommentDocument>, attemptModel: Model<AttemptDocument>, tokenModel: Model<TokenDocument>, deviceModel: Model<DeviceDocument>, banModel: Model<BanDocument>);
    deleteAll(res: Response): Promise<Response<any, Record<string, any>>>;
}
