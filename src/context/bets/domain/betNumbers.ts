import { NumberPair } from './numberPair';
import { NumberPairList, NumberPairListPrimitives } from './numberPairList';

export interface BetNumbersPrimitives {
  betNumberPairs: NumberPairListPrimitives[];
}

export class BetNumbers {
  private betNumberPairs: NumberPairList[];

  constructor(betNumberPairs?: NumberPairList[]) {
    this.betNumberPairs = betNumberPairs ? betNumberPairs : [];
  }

  toPrimitives(): BetNumbersPrimitives {
    const betNumbersPrimitives = this.betNumberPairs.map((numberPairList) => {
      return numberPairList.toPrimitives();
    });

    return {
      betNumberPairs: betNumbersPrimitives,
    };
  }

  static fromPrimitives(betNumbersPrimitives: BetNumbersPrimitives): BetNumbers {
    const numberPairs = betNumbersPrimitives.betNumberPairs.map((numberPairList) => {
      return NumberPairList.fromPrimitives(numberPairList);
    });
    return new BetNumbers(numberPairs);
  }

  generateBetNumberPairs(previousResults: string[]): void {
    const pairCount = 4;
    const maxNumber = 100; 

    this.betNumberPairs = Array(pairCount)
      .fill(null)
      .map(() => new NumberPairList());

    const excludedPairs = this.getExcludedPairs(previousResults, pairCount);

    this.populateBetNumberPairs(excludedPairs, maxNumber);
  }

  private getExcludedPairs(previousResults: string[], pairCount: number): Set<string>[] {
    return Array.from({ length: pairCount }, (_, index) =>
      new Set(
        previousResults.map((num) => num.slice(index, index + 2))
      )
    );
  }

  private populateBetNumberPairs(excludedPairs: Set<string>[], maxNumber: number): void {
    for (let i = 0; i < maxNumber; i++) {
      const pairStr = i.toString().padStart(2, '0');
      excludedPairs.forEach((excludedSet, index) => {
        if (!excludedSet.has(pairStr)) {
          this.betNumberPairs[index].addNumberPair(new NumberPair(pairStr));
        }
      });
    }
  }

  getPairsOfEqualNumbers(columnIndex: number): NumberPairList {
    return this.betNumberPairs[columnIndex].getSameDigitNumberPairList();
  }

  getPairsStartingByNumber(columnIndex: number, number: string): NumberPairList {
    return this.betNumberPairs[columnIndex].getNumberPairListStartingByNumber(number);
  }

  getBetNumbersLength(): number {
    return this.betNumberPairs.length;
  }
}
