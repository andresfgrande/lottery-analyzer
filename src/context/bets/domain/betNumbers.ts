import { NumberPair } from './numberPair';

export interface BetNumbersPrimitives{
  firstPairNumbers: string[];
  lastPairNumbers: string[];
}

export class BetNumbers {
  private firstPairNumbers: NumberPair[];
  private lastPairNumbers: NumberPair[];

  constructor(firstPairNumbers?: NumberPair[], lastPairNumbers?: NumberPair[]) {
    this.firstPairNumbers = firstPairNumbers ? firstPairNumbers : [];
    this.lastPairNumbers = lastPairNumbers ? lastPairNumbers : [];
  }

  toPrimitives(): BetNumbersPrimitives {

    const firstPairNumbers = this.firstPairNumbers.map((num) => {
      return num.toString();
    });

    const lastPairNumbers = this.lastPairNumbers.map((num) => {
      return num.toString();
    });

    return {
      firstPairNumbers,
      lastPairNumbers,
    }
  }

  static fromPrimitives(betNumbersPrimitives: BetNumbersPrimitives): BetNumbers{
    const firstPairNumbers = betNumbersPrimitives.
    firstPairNumbers.map((num) => {
      return new NumberPair(num);
    });

    const lastPairNumbers = betNumbersPrimitives.
    lastPairNumbers.map((num) => {
      return new NumberPair(num);
    });
    return new BetNumbers(firstPairNumbers, lastPairNumbers);
  }

  addBetNumberToFirstPair(numberPair: NumberPair): void {
    this.firstPairNumbers.push(numberPair);
  }

  addBetNumberToLastPair(numberPair: NumberPair): void {
    this.lastPairNumbers.push(numberPair);
  }
}