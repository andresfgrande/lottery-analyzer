import { MongoService } from '../../shared/services/mongo.service';
import { Injectable } from '@nestjs/common';

import { Bet } from '../domain/bet';

@Injectable()
export class BetsRepository {
  constructor(private mongoService: MongoService) {}

  async save(bet: Bet): Promise<void> {
    await this.mongoService
      .getDatabase()
      .collection('bets')
      .updateOne({ betId: bet.getBetId() }, { $set: bet.toPrimitives() }, { upsert: true });
  }
}
