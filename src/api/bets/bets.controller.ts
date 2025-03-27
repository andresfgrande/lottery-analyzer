import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  CreateBetResponse,
  CreateBetService,
} from '../../context/bets/services/createBet.service';
import { GetBetService } from '../../context/bets/services/getBet.service';
import {
  CreateBetRequestDto,
  GetBetResponseDto,
  CreateBetResponseDto,
  GetAllBetsInfoResponseDto,
  UpdateBetRequestDto,
} from './bets.dto';
import { GetAllBetsInfoService } from 'src/context/bets/services/getAllBetsInfo.service';
import { DeleteBetService } from 'src/context/bets/services/deleteBet.service';
import { UpdateBetService } from 'src/context/bets/services/updateBet.service';

@Controller('bets')
export class BetsController {
  constructor(
    private createBetService: CreateBetService,
    private getBetService: GetBetService,
    private getAllBetsInfoService: GetAllBetsInfoService,
    private deleteBetService: DeleteBetService,
    private updateBetService: UpdateBetService,
  ) {}

  @Post()
  async createBet(
    @Body() createBetRequest: CreateBetRequestDto,
  ): Promise<CreateBetResponseDto> {
    return await this.createBetService.execute(createBetRequest);
  }

  @Get(':betId')
  async getBet(@Param('betId') betId: string): Promise<GetBetResponseDto> {
    return await this.getBetService.execute({ betId });
  }

  @Get()
  async getAllBetsInfo(): Promise<GetAllBetsInfoResponseDto> {
    return await this.getAllBetsInfoService.execute();
  }

  @Delete(':betId')
  async deleteBet(@Param('betId') betId: string): Promise<void> {
    return await this.deleteBetService.execute({ betId });
  }

  @Put(':betId')
  async updateBet(
    @Param('betId') betId: string,
    @Body() updateBetRequestDto: UpdateBetRequestDto,
  ): Promise<void> {
    const { previousResults } = updateBetRequestDto;

    return await this.updateBetService.execute({
      betId: betId,
      previousResults: previousResults,
    });
  }
}
