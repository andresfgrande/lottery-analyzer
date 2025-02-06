import { MongoService } from '../../shared/services/mongo.service';
import { Bet } from '../domain/bet';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BetsRepository {
  constructor(private mongoService: MongoService) {}

  async save(bet: Bet): Promise<void> {
    await this.mongoService
      .getDatabase()
      .collection('bets')
      .updateOne({ idBet: bet.idBet }, { $set: bet }, { upsert: true });
  }
}
