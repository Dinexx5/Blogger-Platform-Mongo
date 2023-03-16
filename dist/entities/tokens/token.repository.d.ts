import { Model } from 'mongoose';
import { TokenDocument } from './token.schema';
export declare class TokenRepository {
    private tokenModel;
    constructor(tokenModel: Model<TokenDocument>);
    findToken(exp: string): Promise<TokenDocument | null>;
    deleteTokensForBan(userId: string): Promise<import("mongodb").DeleteResult>;
    save(instance: any): Promise<void>;
}
