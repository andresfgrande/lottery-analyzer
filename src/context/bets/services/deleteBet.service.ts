import { Injectable, NotFoundException } from '@nestjs/common';
import { BetsRepository } from '../infrastructure/betsRepository';

export interface DeleteRequest {
  betId: string;
}

@Injectable()
export class DeleteBetService {
  constructor(private betsRepository: BetsRepository) {}

  async execute(deleteRequest: DeleteRequest): Promise<void> {
    const { betId } = deleteRequest;

    const response = await this.betsRepository.deleteBet(betId);

    if (!response) {
      throw new NotFoundException();
    }
  }
}
