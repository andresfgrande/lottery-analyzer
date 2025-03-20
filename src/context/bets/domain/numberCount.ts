import { Count } from './count';
import { NumberPair } from './numberPair';

export interface NumberCountPrimitves{
  numberPair: string;
  count: number;
};

export class NumberCount {
  private numberPair: NumberPair;
  private count: Count;

  constructor(numberPair: NumberPair, count: Count) {
    this.numberPair = numberPair;
    this.count = count;
  }

  toPrimitives(): NumberCountPrimitves {
    return {
      numberPair: this.numberPair.toString(),
      count: this.count.toValue()
    };
  }

  static fromPrimitives(numberCountPrimitves: NumberCountPrimitves): NumberCount {
    return new NumberCount(
      new NumberPair(numberCountPrimitves.numberPair),
      new Count(numberCountPrimitves.count)
    );
  }
}
