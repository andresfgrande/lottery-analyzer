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
    const excludedFirstPairs = new Set(
      this.previousResults.map((num) => num.slice(0, 2)),
    );
    const excludedLastPairs = new Set(
      this.previousResults.map((num) => num.slice(-2)),
    );
    for (let i = 0; i < 100; i++) {
      const firstPair = i.toString().padStart(2, '0');
      if (excludedFirstPairs.has(firstPair)) {
        continue;
      }
      this.betNumbers.addBetNumberToFirstPair(new NumberPair(firstPair));
    }

    for (let j = 0; j < 100; j++) {
      const lastPair = j.toString().padStart(2, '0');
      if (excludedLastPairs.has(lastPair)) {
        continue;
      }
      this.betNumbers.addBetNumberToLastPair(new NumberPair(lastPair));
    }
  }
}