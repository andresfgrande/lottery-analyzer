import { BetId } from './betId';
import { CreationDate } from './creationDate';
import { BetNumbers, BetNumbersPrimitives } from './betNumbers';
import { NumberPair } from './numberPair';

export interface BetPrimitives {
  betId: string;
  creationDate: string;
  previousResults: string[];
  betNumbers: BetNumbersPrimitives;
}

export class Bet {
  private betId: BetId;
  private creationDate: CreationDate;
  private previousResults: string[];
  private betNumbers: BetNumbers;

  constructor(
    betId: BetId,
    creationDate: CreationDate,
    previousResults: string[],
    betNumbers: BetNumbers,
  ) {
    this.betId = betId;
    this.creationDate = creationDate;
    this.previousResults = previousResults;
    this.betNumbers = betNumbers;
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
    };
  }

  static fromPrimitives(betPrimitives: BetPrimitives): Bet {
    return new Bet(
      new BetId(betPrimitives.betId),
      new CreationDate(betPrimitives.creationDate),
      betPrimitives.previousResults,
      BetNumbers.fromPrimitives(betPrimitives.betNumbers),
    );
  }

  generateBetNumbers(): void {
    this.betNumbers.generateBetNumberPairs(this.previousResults);
  }
}