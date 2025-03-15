import { BetNumber, BetNumberPrimitives } from './betNumber';
import { NumberPair } from './numberPair';
import { MiddleNumber } from './middleNumber';

export class BetNumbers {
  private numbers: BetNumber[];

  constructor(numbers?: BetNumber[]) {
    this.numbers = numbers ? numbers : [];
  }

  toPrimitives(): BetNumberPrimitives[] {
    return this.numbers.map((betNumber) => {
      return betNumber.toPrimitives();
    });
  }

  static fromPrimitives(betNumbersPrimitives: BetNumberPrimitives[]): BetNumbers{
    const betNumbersList:BetNumber [] =
      betNumbersPrimitives.map((betNumberPrimitives) => {
        return new BetNumber(
          new NumberPair(betNumberPrimitives.firstPair),
          new MiddleNumber(betNumberPrimitives.middle),
          new NumberPair(betNumberPrimitives.lastPair)
        )
      })
    return new BetNumbers(betNumbersList);
  }

  addBetNumber(betNumber: BetNumber): void {
    this.numbers.push(betNumber);
  }
}