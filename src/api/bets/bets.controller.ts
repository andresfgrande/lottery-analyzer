import { Controller, Get } from '@nestjs/common';
import { BetsService } from '../../context/bets/services/bets.service';

@Controller('bets')
export class BetsController {
  constructor(private createBetService: BetsService) {}

  @Get()
  getHelloBet() {
    return 'Hello Bets2';
  }
}
