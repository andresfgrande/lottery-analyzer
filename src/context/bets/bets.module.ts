import { Module } from '@nestjs/common';
import { CreateBetService } from './services/createBet.service';
import { BetsRepository } from './infrastructure/betsRepository';
import { SharedModule } from '../shared/shared.module';
import { DateGenerator } from './infrastructure/dateGenerator';
import { GetBetService } from './services/getBet.service';

@Module({
  imports: [SharedModule],
  providers: [CreateBetService, BetsRepository, DateGenerator, GetBetService],
  exports: [CreateBetService, GetBetService],
})
export class BetsModule {}
