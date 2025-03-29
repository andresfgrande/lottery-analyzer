import { BetInfo } from 'src/context/bets/services/getAllBetsInfo.service';
import { BetNumbersPrimitives } from '../../context/bets/domain/betNumbers';
import { StatsPrimitives } from 'src/context/bets/domain/stats';

export interface CreateBetRequestDto {
  previousResults: string[];
  generateBet: boolean;
}

export interface CreateBetResponseDto {
  betId: string;
}

export interface GetBetResponseDto {
  betId: string;
  creationDate: string;
  previousResults: string[];
  betNumbers: BetNumbersPrimitives;
  stats: StatsPrimitives;
}

export interface GetAllBetsInfoResponseDto {
  bets: BetInfo[];
}

export interface UpdateBetRequestDto {
  previousResults: string[];
}
