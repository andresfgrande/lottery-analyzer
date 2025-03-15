import { MiddleNumber } from './middleNumber';
import { NumberPair } from './numberPair';

export interface BetNumberPrimitives {
  firstPair: string;
  middle: string;
  lastPair: string;
}

export class BetNumber {
  constructor(
    private firstPair: NumberPair,
    private middle: MiddleNumber,
    private lastPair: NumberPair,
  ) {
  }

  toPrimitives(): BetNumberPrimitives {
    return {
      firstPair: this.firstPair.toString(),
      middle: this.middle.toString(),
      lastPair: this.lastPair.toString(),
    };
  }
}