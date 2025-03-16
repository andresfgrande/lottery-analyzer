import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateBetService } from '../../context/bets/services/createBet.service';
import { GetBetService } from '../../context/bets/services/getBet.service';
import { CreateBetRequestDto, GetBetRequestDto, GetBetResponseDto } from './bets.dto';

@Controller('bets')
export class BetsController {
  constructor(private createBetService: CreateBetService,
              private getBetService: GetBetService) {}

  @Post()
  async createBet(@Body() createBetRequest: CreateBetRequestDto): Promise<void> {
    await this.createBetService.execute(createBetRequest);
  }

  @Get(':betId')
  async getBet(@Param('betId') betId: string): Promise<GetBetResponseDto> {
    return await this.getBetService.execute({betId});
  }

}
