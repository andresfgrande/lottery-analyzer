import { NumberPair } from './numberPair';

export interface NumberPairListPrimitives {
  pairList: string[];
}

export class NumberPairList {
  private pairList: NumberPair[];

  constructor(pairList?: NumberPair[]) {
    this.pairList = pairList ? pairList : [];
  }

  addNumberPair(numberPair: NumberPair): void {
    this.pairList.push(numberPair);
  }

  toPrimitives(): NumberPairListPrimitives {
    return {
      pairList: this.pairList.map((numberPair) => {
        return numberPair.toString();
      }),
    };
  }

  static fromPrimitives(
    numberPairListPrimitives: NumberPairListPrimitives,
  ): NumberPairList {
    const numberPairList: NumberPair[] = numberPairListPrimitives.pairList.map((num) => {
      return new NumberPair(num);
    });

    return new NumberPairList(numberPairList);
  }

  getSameDigitNumberPairList(): NumberPairList {
    const numberPairList = this.pairList.filter(
      (num) => num.getFirstNumber() === num.getSecondNumber(),
    );
    return new NumberPairList(numberPairList);
  }

  getNumberPairListStartingByNumber(number: string): NumberPairList {
    const numberPairList = this.pairList.filter((num) => num.getFirstNumber() === number);
    return new NumberPairList(numberPairList);
  }

  getNumberPairList(): NumberPair[] {
    return this.pairList;
  }
}
