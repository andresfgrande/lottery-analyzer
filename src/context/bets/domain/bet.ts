import { BetId } from './betId';
import { CreationDate } from './creationDate';
import { BetNumberPrimitives } from './betNumber';
import { BetNumbers } from './betNumbers';

export interface BetPrimitives {
  betId: string;
  creationDate: string;
  previousResults: string[];
  betNumbers: BetNumberPrimitives[];
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
}