import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class BanInfoSchema {
  @Prop()
  isBanned: boolean;
  @Prop()
  banDate: string;
  @Prop()
  banReason: string;
}

@Schema()
export class EmailConfirmationSchema {
  @Prop()
  confirmationCode: string;
  @Prop()
  expirationDate: Date;
  @Prop()
  isConfirmed: boolean;
  @Prop()
  createdAt: string;
}
@Schema()
export class PasswordRecoverySchema {
  @Prop({ default: null })
  recoveryCode: string;
  @Prop({ default: null })
  expirationDate: Date;
}

@Schema()
export class AccountDataSchema {
  @Prop()
  login: string;
  @Prop()
  email: string;
  @Prop()
  createdAt: string;
  @Prop()
  passwordHash: string;
}

@Schema()
export class User {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  accountData: AccountDataSchema;

  @Prop({ required: true })
  emailConfirmation: EmailConfirmationSchema;

  @Prop({ required: true })
  passwordRecovery: PasswordRecoverySchema;

  @Prop({ required: true })
  banInfo: BanInfoSchema;
}

export const UserSchema = SchemaFactory.createForClass(User);
