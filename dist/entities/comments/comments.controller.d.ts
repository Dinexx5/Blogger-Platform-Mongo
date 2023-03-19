import { Response } from 'express';
import { CommentsQueryRepository } from './comments.query-repo';
import { CommentsService } from './comments.service';
import { CreateCommentModel, LikeInputModel } from './comments.models';
export declare class CommentsController {
    protected commentsQueryRepository: CommentsQueryRepository;
    protected commentsService: CommentsService;
    constructor(commentsQueryRepository: CommentsQueryRepository, commentsService: CommentsService);
    getComment(userId: any, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateComment(userId: any, commentId: string, inputModel: CreateCommentModel, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteComment(userId: any, commentId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    likeComment(userId: any, commentId: string, inputModel: LikeInputModel, res: Response): Promise<Response<any, Record<string, any>>>;
}
