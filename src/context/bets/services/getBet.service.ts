import { Injectable, NotFoundException } from '@nestjs/common';
import { BetsRepository } from '../infrastructure/betsRepository';
import { BetNumbersPrimitives } from '../domain/betNumbers';
import { BetId } from '../domain/betId';
import { StatsPrimitives } from '../domain/stats';
import { GuessesPrimitives } from '../domain/Guesses';

export interface GetBetRequest {
  betId: string;
}

export interface GetBetResponse {
  betId: string;
  creationDate: string;
  previousResults: string[];
  betNumbers: BetNumbersPrimitives;
  stats: StatsPrimitives;
  guesses: GuessesPrimitives;
}

@Injectable()
export class GetBetService {
  constructor(private betsRepository: BetsRepository) {}

  async execute(getBetRequest: GetBetRequest): Promise<GetBetResponse> {
    const { betId } = getBetRequest;
    const bet = await this.betsRepository.getBet(betId);

    if (!bet) {
      throw new NotFoundException();
    }

    return bet.toPrimitives();
  }
}
