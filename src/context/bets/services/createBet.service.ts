import { Injectable } from '@nestjs/common';
import { BetsRepository } from '../infrastructure/betsRepository';
import { DateGenerator } from '../infrastructure/dateGenerator';
import { CreationDate } from '../domain/creationDate';
import { BetId } from '../domain/betId';
import { Bet } from '../domain/bet';
import { v4 as uuidv4 } from 'uuid';
import { BetNumbers } from '../domain/betNumbers';
import { Stats } from '../domain/stats';

export interface CreateBetRequest {
  previousResults: string[];
  generateBet: boolean;
}

export interface CreateBetResponse {
  betId: string;
}

@Injectable()
export class CreateBetService {
  constructor(
    private betsRepository: BetsRepository,
    private dateGenerator: DateGenerator,
  ) {}

  async execute(createBetRequest: CreateBetRequest): Promise<CreateBetResponse> {
    const { previousResults, generateBet } = createBetRequest;

    const bet = new Bet(
      new BetId(uuidv4()),
      new CreationDate(this.dateGenerator.getDate()),
      previousResults,
      new BetNumbers(),
      new Stats(),
    );

    if (generateBet) {
      bet.generateBetNumbers();
      bet.generateStats();
    }

    await this.betsRepository.saveBet(bet);

    return {
      betId: bet.getBetId(),
    };
  }
}
