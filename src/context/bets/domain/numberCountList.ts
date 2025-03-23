import { NumberCount, NumberCountPrimitves } from './numberCount';

export interface NumberCountListPrimitives {
  numberCounts: NumberCountPrimitves[];
}

export class NumberCountList {
  private numberCounts: NumberCount[];

  constructor(numberCounts?: NumberCount[]) {
    this.numberCounts = numberCounts ? numberCounts : [];
  }

  addNumberCount(numberCount: NumberCount): void {
    this.numberCounts.push(numberCount);
  }

  toPrimitives(): NumberCountListPrimitives {
    return {
      numberCounts: this.numberCounts.map((numberCount) => {
        return numberCount.toPrimitives();
      }),
    };
  }

  static fromPrimitves(
    numberCountListPrimitives: NumberCountListPrimitives,
  ): NumberCountList {
    const numberCounts =
      numberCountListPrimitives.numberCounts.map(
        (numberCount) => {
          return NumberCount.fromPrimitives(numberCount);
        },
      );

    return new NumberCountList(numberCounts);
  }
}
