import mongoose, { HydratedDocument } from 'mongoose';
export type AttemptDocument = HydratedDocument<Attempt>;
export declare class Attempt {
    _id: mongoose.Schema.Types.ObjectId;
    requestData: string;
    date: string;
}
export declare const AttemptSchema: mongoose.Schema<Attempt, mongoose.Model<Attempt, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Attempt>;
