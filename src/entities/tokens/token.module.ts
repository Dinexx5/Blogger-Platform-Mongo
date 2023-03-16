import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenRepository } from './token.repository';
import { Token, TokenSchema } from './token.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }])],
  providers: [TokenRepository],
  exports: [TokenRepository],
})
export class TokensModule {}
