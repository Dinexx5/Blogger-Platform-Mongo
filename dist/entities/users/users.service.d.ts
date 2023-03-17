import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { UsersRepository } from './users.repository';
import { CreateUserModel, NewPasswordModel, SaUserViewModel } from './userModels';
export declare class UsersService {
    protected usersRepository: UsersRepository;
    private userModel;
    constructor(usersRepository: UsersRepository, userModel: Model<UserDocument>);
    createUser(inputModel: CreateUserModel): Promise<SaUserViewModel>;
    deleteUserById(userId: string): Promise<boolean>;
    findUserByLoginOrEmail(login: string): Promise<UserDocument | null>;
    generateHash(password: string): Promise<string>;
    saveUser(userDTO: any): Promise<mongoose.Document<unknown, any, User> & Omit<User & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, never>>;
    updateCode(email: string, code: string): Promise<boolean>;
    updateConfirmation(code: string): Promise<boolean>;
    updateRecoveryCode(email: string, confirmationCode: string): Promise<boolean>;
    updatePassword(inputModel: NewPasswordModel): Promise<boolean>;
}
