import { MongoService } from '../services/mongoService';
import { Bet } from '../domain/bet';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LotteryRepository {
  constructor(private mongoService: MongoService) {}

  async save(bet: Bet): Promise<void> {
    await this.mongoService
      .getDatabase()
      .collection('bets')
      .updateOne({ idBet: bet.idBet }, { $set: bet }, { upsert: true });
  }
}
