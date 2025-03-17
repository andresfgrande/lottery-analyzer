import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateBetResponse, CreateBetService } from '../../context/bets/services/createBet.service';
import { GetBetService } from '../../context/bets/services/getBet.service';
import { CreateBetRequestDto, GetBetRequestDto, GetBetResponseDto, CreateBetResponseDto, GetAllBetsInfoResponseDto } from './bets.dto';
import { GetAllBetsInfoService } from 'src/context/bets/services/getAllBetsInfo.service';

@Controller('bets')
export class BetsController {

  constructor(private createBetService: CreateBetService,
              private getBetService: GetBetService,
              private getAllBetsInfoService: GetAllBetsInfoService
          ) {}

  @Post()
  async createBet(@Body() createBetRequest: CreateBetRequestDto): Promise<CreateBetResponseDto> {
    return await this.createBetService.execute(createBetRequest);
  }

  @Get(':betId')
  async getBet(@Param('betId') betId: string): Promise<GetBetResponseDto> {
    return await this.getBetService.execute({betId});
  }

  @Get()
  async getAllBetsInfo(): Promise<GetAllBetsInfoResponseDto> {
    return await this.getAllBetsInfoService.execute();
  }

}
