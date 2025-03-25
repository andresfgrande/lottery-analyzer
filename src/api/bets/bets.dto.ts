import { BetInfo } from 'src/context/bets/services/getAllBetsInfo.service';
import { BetNumbersPrimitives } from '../../context/bets/domain/betNumbers';

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
}

export interface GetAllBetsInfoResponseDto {
  bets: BetInfo[];
}
