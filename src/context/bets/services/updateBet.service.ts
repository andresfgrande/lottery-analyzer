import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BetsRepository } from '../infrastructure/betsRepository';
import { v4 as uuidv4 } from 'uuid';

export interface UpdateBetRequest {
  betId: string;
  previousResults: string[];
}

@Injectable()
export class UpdateBetService {
  constructor(private betsRepository: BetsRepository) {}

  async execute(updateBetRequest: UpdateBetRequest): Promise<void> {
    const { betId, previousResults } = updateBetRequest;

    const savedBet = await this.betsRepository.getBet(betId);

    if (!savedBet) {
      throw new NotFoundException();
    }

    savedBet.updatePreviousResults(previousResults);
    savedBet.generateBetNumbers();
    savedBet.generateStats();

    await this.betsRepository.saveBet(savedBet);
  }
}
