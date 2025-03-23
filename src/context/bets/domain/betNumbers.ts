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
    this.betNumberPairs = [
      new NumberPairList(),
      new NumberPairList(),
      new NumberPairList(),
      new NumberPairList(),
    ];

    const excludedPairs = [
      new Set(previousResults.map((num) => num.slice(0, 2))),
      new Set(previousResults.map((num) => num.slice(1, 3))),
      new Set(previousResults.map((num) => num.slice(2, 4))),
      new Set(previousResults.map((num) => num.slice(3, 5))),
    ];

    for (let i = 0; i < 100; i++) {
      const pairStr = i.toString().padStart(2, '0');

      if (!excludedPairs[0].has(pairStr)) {
        this.betNumberPairs[0].addNumberPair(new NumberPair(pairStr));
      }

      if (!excludedPairs[1].has(pairStr)) {
        this.betNumberPairs[1].addNumberPair(new NumberPair(pairStr));
      }

      if (!excludedPairs[2].has(pairStr)) {
        this.betNumberPairs[2].addNumberPair(new NumberPair(pairStr));
      }

      if (!excludedPairs[3].has(pairStr)) {
        this.betNumberPairs[3].addNumberPair(new NumberPair(pairStr));
      }
    }
  }
}
