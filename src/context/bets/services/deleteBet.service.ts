import { Injectable } from '@nestjs/common';
import { BetsRepository } from '../infrastructure/betsRepository';

export interface DeleteRequest {
  betId: string;
}

@Injectable()
export class DeleteService {
  constructor(private betsRepository: BetsRepository) {}

  async execute(deleteRequest: DeleteRequest): Promise<void> {
    //TODO
  }
}
