import { MongoService } from '../../shared/services/mongo.service';
import { Injectable } from '@nestjs/common';

import { Bet, BetPrimitives } from '../domain/bet';
import { BetInfo } from '../services/getAllBetsInfo.service';

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

  async get(betId: string): Promise<Bet | undefined> {
    const savedBet = await this.mongoService
      .getDatabase()
      .collection('bets')
      .findOne({ betId: betId });

    if (!savedBet) {
      return undefined;
    }

    const betPrimitives: BetPrimitives = {
      betId: savedBet.betId,
      betNumbers: {
        betNumberPairs: savedBet.betNumbers.betNumberPairs,
      },
      creationDate: savedBet.creationDate,
      previousResults: savedBet.previousResults,
      stats: savedBet.stats,
    };

    return Bet.fromPrimitives(betPrimitives);
  }

  async getAllBetsInfo():Promise<BetInfo[]>{
    const savedBets = await this.mongoService.getDatabase().collection('bets').find().toArray();
    return savedBets.map((bet)=>{
      return { 
        betId: bet.betId, 
        creationDate: bet.creationDate 
      } as BetInfo;
    });
  }

  async deleteBet(betId: string): Promise<string | undefined> {
    const response = await this.mongoService
      .getDatabase()
      .collection('bets')
      .deleteOne({ betId:
        betId
      });

      const deletedBetId = response.deletedCount === 1 ? betId : undefined;

      return deletedBetId;
  }
}
