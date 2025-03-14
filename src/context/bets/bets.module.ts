import { Module } from '@nestjs/common';
import { CreateBetService } from './services/createBet.service';
import { BetsRepository } from './infrastructure/betsRepository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [CreateBetService, BetsRepository],
  exports: [CreateBetService],
})
export class BetsModule {}
