import { BetId } from './betId';
import { CreationDate } from './creationDate';
import { BetNumbers, BetNumbersPrimitives } from './betNumbers';
import { NumberPair } from './numberPair';
import { Stats, StatsPrimitives } from './stats';

export interface BetPrimitives {
  betId: string;
  creationDate: string;
  previousResults: string[];
  betNumbers: BetNumbersPrimitives;
  stats: StatsPrimitives;
}

export class Bet {
  private betId: BetId;
  private creationDate: CreationDate;
  private previousResults: string[];
  private betNumbers: BetNumbers;
  private stats: Stats;

  constructor(
    betId: BetId,
    creationDate: CreationDate,
    previousResults: string[],
    betNumbers: BetNumbers,
    stats: Stats,
  ) {
    this.betId = betId;
    this.creationDate = creationDate;
    this.previousResults = previousResults;
    this.betNumbers = betNumbers;
    this.stats = stats;
  }

  getBetId(): string {
    return this.betId.toString();
  }

  toPrimitives(): BetPrimitives {
    return {
      betId: this.betId.toString(),
      creationDate: this.creationDate.toString(),
      previousResults: this.previousResults,
      betNumbers: this.betNumbers.toPrimitives(),
      stats: this.stats.toPrimitives(),
    };
  }

  static fromPrimitives(betPrimitives: BetPrimitives): Bet {
    return new Bet(
      new BetId(betPrimitives.betId),
      new CreationDate(betPrimitives.creationDate),
      betPrimitives.previousResults,
      BetNumbers.fromPrimitives(betPrimitives.betNumbers),
      Stats.fromPrimitives(betPrimitives.stats),
    );
  }

  generateBetNumbers(): void {
    this.betNumbers.generateBetNumberPairs(this.previousResults);
  }

  generateStats(): void {
    this.stats.generateStats(this.previousResults);
  }

  updatePreviousResults(previousResults: string[]): void{
    this.previousResults = previousResults;
  }
}
