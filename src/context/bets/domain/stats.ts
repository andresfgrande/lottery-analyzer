import { Count } from './count';
import { NumberCount, NumberCountPrimitves } from './numberCount';
import { NumberCountList, NumberCountListPrimitives } from './numberCountList';
import { NumberPair } from './numberPair';

export interface StatsPrimitives {
  statsCollection: NumberCountListPrimitives[];
}

export class Stats {
  private statsCollection: NumberCountList[];

  constructor(statsCollection?: NumberCountList[]) {
    this.statsCollection = statsCollection ? statsCollection : [];
  }

  toPrimitives(): StatsPrimitives {
    return {
      statsCollection: this.statsCollection.map((stat) => {
        return stat.toPrimitives();
      }),
    };
  }

  static fromPrimitives(statsPrimitives: StatsPrimitives): Stats {
    const numberCountList = statsPrimitives.statsCollection.map((statList) => {
      return NumberCountList.fromPrimitves(statList);
    });

    return new Stats(numberCountList);
  }

  generateStats(previousResults: string[]): void {
    this.statsCollection = [
      new NumberCountList(),
      new NumberCountList(),
      new NumberCountList(),
      new NumberCountList(),
    ];

    const excludedPairs = [
      new Set(previousResults.map((num) => num.slice(0, 2))),
      new Set(previousResults.map((num) => num.slice(1, 3))),
      new Set(previousResults.map((num) => num.slice(2, 4))),
      new Set(previousResults.map((num) => num.slice(3, 5))),
    ];

    excludedPairs.forEach((pairSet, index) => {
      const pairCounts = previousResults.reduce(
        (acc, result) => {
          const pair = result.slice(index, index + 2);
          acc[pair] = (acc[pair] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      Object.entries(pairCounts).forEach(([numberPair, count]) => {
        const numberCount = new NumberCount(new NumberPair(numberPair), new Count(count));
        this.statsCollection[index].addNumberCount(numberCount);
      });
    });
  }
}
