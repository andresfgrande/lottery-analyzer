import { BetNumbersPrimitives } from '../../context/bets/domain/betNumbers';

export interface CreateBetRequestDto {
  previousResults: string[];
  generateBet: boolean;
}

export interface GetBetRequestDto {
  betId: string;
}

export interface GetBetResponseDto {
  betId: string;
  creationDate: string;
  previousResults: string[];
  betNumbers: BetNumbersPrimitives;
}