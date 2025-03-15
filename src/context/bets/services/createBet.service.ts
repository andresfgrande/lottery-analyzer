import { Injectable } from '@nestjs/common';
import { BetsRepository } from '../infrastructure/betsRepository';
import { DateGenerator } from '../infrastructure/dateGenerator';
import { CreateBetRequest } from '../../../bets.service.spec';
import { CreationDate } from '../domain/creationDate';
import { BetId } from '../domain/betId';
import { Bet } from '../domain/bet';
import { v4 as uuidv4 } from 'uuid';
import { BetNumbers } from '../domain/betNumbers';

@Injectable()
export class CreateBetService {
  constructor(private betsRepository: BetsRepository, private dateGenerator: DateGenerator) {}

  async execute(createBetRequest: CreateBetRequest): Promise<void> {

    const bet = new Bet(new BetId(uuidv4()),
      new CreationDate(this.dateGenerator.getDate()),
      createBetRequest.previousResults,
      new BetNumbers()
    );

    await this.betsRepository.save(bet);
  }
}
