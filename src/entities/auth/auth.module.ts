import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessJwtStrategy } from './strategies/access.jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth-service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from '../tokens/token.schema';
import { Device, DeviceSchema } from '../devices/devices.schema';
import { EmailAdapter } from '../../adapters/email.adapter';
import { RefreshJwtStrategy } from './strategies/refresh.jwt.strategy';
import { DevicesModule } from '../devices/devices.module';
import { AuthController } from './auth.controller';
import { AttemptsModule } from '../attempts/attempts.module';
import { TokensModule } from '../tokens/token.module';
import { BansRepository } from '../bans/bans.repository';
import { Ban, BanSchema } from '../bans/application/domain/bans.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    MongooseModule.forFeature([{ name: Ban.name, schema: BanSchema }]),
    UsersModule,
    PassportModule,
    DevicesModule,
    AttemptsModule,
    TokensModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    AccessJwtStrategy,
    RefreshJwtStrategy,
    EmailAdapter,
    BansRepository,
  ],
  controllers: [AuthController],
  exports: [AuthService, EmailAdapter],
})
export class AuthModule {}
