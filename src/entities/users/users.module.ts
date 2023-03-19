import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UsersQueryRepository } from './users.query-repo';
import { UsersSAController } from './sa.users.controller';
import { IsLoginExistsDecorator } from '../../shared/decorators/validation/login-exists.decorator';
import { IsEmailExistsDecorator } from '../../shared/decorators/validation/email-exists.decorator';
import { IsConfirmationCodeCorrect } from '../../shared/decorators/validation/confirm-email.decorator';
import { EmailResendingDecorator } from '../../shared/decorators/validation/email-resending.decorator';
import { IsRecoveryCodeCorrect } from '../../shared/decorators/validation/password-recovery.decorator';
import { IsUserExistsDecorator } from '../../shared/decorators/validation/user-exists.decorator';
import { Ban, BanSchema } from '../bans/application/domain/bans.schema';
import { DevicesRepository } from '../devices/devices.repository';
import { Device, DeviceSchema } from '../devices/devices.schema';
import { TokenRepository } from '../tokens/token.repository';
import { Token, TokenSchema } from '../tokens/token.schema';
import { SaUsersQueryRepository } from './sa.users.query-repo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Ban.name, schema: BanSchema }]),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  providers: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    SaUsersQueryRepository,
    IsLoginExistsDecorator,
    IsEmailExistsDecorator,
    IsConfirmationCodeCorrect,
    EmailResendingDecorator,
    IsRecoveryCodeCorrect,
    IsUserExistsDecorator,
    DevicesRepository,
    TokenRepository,
  ],
  controllers: [UsersSAController],
  exports: [UsersService, UsersRepository, UsersQueryRepository, SaUsersQueryRepository],
})
export class UsersModule {}
