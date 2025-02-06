import { Module } from '@nestjs/common';
import { BetsModule as ContextBetsModule } from '../../context/bets/bets.module';
import { BetsController } from './bets.controller';

@Module({
  imports: [ContextBetsModule],
  controllers: [BetsController],
})
export class BetsModule {}
