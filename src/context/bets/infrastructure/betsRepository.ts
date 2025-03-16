import { MongoService } from '../../shared/services/mongo.service';
import { Injectable } from '@nestjs/common';

import { Bet, BetPrimitives } from '../domain/bet';
import { BetId } from '../domain/betId';

@Injectable()
export class BetsRepository {
  constructor(private mongoService: MongoService) {}

  async save(bet: Bet): Promise<void> {
    await this.mongoService
      .getDatabase()
      .collection('bets')
      .updateOne(
        { betId: bet.getBetId() },
        { $set: bet.toPrimitives() },
        { upsert: true },
      );
  }

  async get(betId: BetId): Promise<Bet | undefined> {
    const savedBet = await this.mongoService
      .getDatabase()
      .collection('bets')
      .findOne({ betId: betId.toString() });

    if (!savedBet) {
      return undefined;
    }

    const betPrimitives: BetPrimitives = {
      betId: savedBet.betId,
      betNumbers: {
        firstPairNumbers: savedBet.betNumbers.firstPairNumbers,
        lastPairNumbers: savedBet.betNumbers.lastPairNumbers,
      },
      creationDate: savedBet.creationDate,
      previousResults: savedBet.previousResults,
    };

    return Bet.fromPrimitives(betPrimitives);
  }
}
