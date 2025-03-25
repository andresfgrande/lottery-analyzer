import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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
} from './bets.dto';
import { GetAllBetsInfoService } from 'src/context/bets/services/getAllBetsInfo.service';
import { DeleteBetService } from 'src/context/bets/services/deleteBet.service';

@Controller('bets')
export class BetsController {
  constructor(
    private createBetService: CreateBetService,
    private getBetService: GetBetService,
    private getAllBetsInfoService: GetAllBetsInfoService,
    private deleteBetService: DeleteBetService,
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
}
