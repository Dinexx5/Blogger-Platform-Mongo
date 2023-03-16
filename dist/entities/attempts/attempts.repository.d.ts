import { Model } from 'mongoose';
import { AttemptDocument } from './attempts.schema';
export declare class AttemptsRepository {
    private attemptModel;
    constructor(attemptModel: Model<AttemptDocument>);
    addNewAttempt(requestData: string, date: string): Promise<void>;
    countAttempts(requestData: string, tenSecondsAgo: string): Promise<number>;
}
