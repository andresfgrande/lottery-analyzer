import { Module } from '@nestjs/common';
import { BetsService } from './services/bets.service';
import { BetsRepository } from './infrastructure/betsRepository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [BetsService, BetsRepository],
  exports: [BetsService],
})
export class BetsModule {}
