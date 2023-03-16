import mongoose, { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare class BanInfoSchema {
    isBanned: boolean;
    banDate: string;
    banReason: string;
}
export declare class EmailConfirmationSchema {
    confirmationCode: string;
    expirationDate: Date;
    isConfirmed: boolean;
    createdAt: string;
}
export declare class PasswordRecoverySchema {
    recoveryCode: string;
    expirationDate: Date;
}
export declare class AccountDataSchema {
    login: string;
    email: string;
    createdAt: string;
    passwordHash: string;
}
export declare class User {
    _id: mongoose.Schema.Types.ObjectId;
    accountData: AccountDataSchema;
    emailConfirmation: EmailConfirmationSchema;
    passwordRecovery: PasswordRecoverySchema;
    banInfo: BanInfoSchema;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
