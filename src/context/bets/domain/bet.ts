import { BetId } from './betId';
import { CreationDate } from './creationDate';
import { BetNumber, BetNumberPrimitives } from './betNumber';
import { BetNumbers } from './betNumbers';
import { MiddleNumber } from './middleNumber';
import { NumberPair } from './numberPair';

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

  generateBetNumbers(): void{

    const excludedFirstPairs = new Set(this.previousResults.map((num)=>num.slice(0,2)));
    const excludedLastPairs = new Set(this.previousResults.map((num)=>num.slice(-2)));

    for (let i = 0; i < 100; i++) {
      const firstPair = i.toString().padStart(2, "0");
      if (excludedFirstPairs.has(firstPair)) {
        continue;
      }
      for (let j = 0; j < 100; j++) {
        const lastPair = j.toString().padStart(2, "0");
        if (excludedLastPairs.has(lastPair)) {
          continue;
        }
        this.betNumbers.addBetNumber(new BetNumber(new NumberPair(firstPair),
                                                   new MiddleNumber(""),
                                                   new NumberPair(lastPair)))
      }
    }
  }
}