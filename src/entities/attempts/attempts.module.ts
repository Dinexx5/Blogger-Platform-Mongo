import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AttemptsRepository } from './attempts.repository';
import { Attempt, AttemptSchema } from './attempts.schema';
import { RateLimitGuard } from '../auth/guards/rate-limit.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: Attempt.name, schema: AttemptSchema }])],
  providers: [AttemptsRepository, RateLimitGuard],
  exports: [AttemptsRepository, RateLimitGuard],
})
export class AttemptsModule {}
