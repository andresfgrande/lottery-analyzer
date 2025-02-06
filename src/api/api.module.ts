import { Module } from '@nestjs/common';
import { BetsModule } from './bets/bets.module';

@Module({
  imports: [BetsModule],
})
export class ApiModule {}
