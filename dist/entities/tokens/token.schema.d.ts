import mongoose, { HydratedDocument } from 'mongoose';
export type TokenDocument = HydratedDocument<Token>;
export declare class Token {
    _id: mongoose.Schema.Types.ObjectId;
    issuedAt: string;
    expiredAt: string;
    deviceId: string;
    deviceName: string;
    ip: string;
    userId: mongoose.Schema.Types.ObjectId;
}
export declare const TokenSchema: mongoose.Schema<Token, mongoose.Model<Token, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Token>;
