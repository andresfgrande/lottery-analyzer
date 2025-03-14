import { Controller, Get } from '@nestjs/common';
import { CreateBetService } from '../../context/bets/services/createBet.service';

@Controller('bets')
export class BetsController {
  constructor(private createBetService: CreateBetService) {}

  @Get()
  getHelloBet() {
    return 'Hello Bets2';
  }
}
