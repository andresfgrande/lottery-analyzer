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
    const statsCount = 4;

    this.statsCollection = Array(statsCount)
      .fill(null)
      .map(() => new NumberCountList());

    this.populateStatsCollection(previousResults, statsCount);
  }

  private populateStatsCollection(previousResults: string[], statsCount: number): void {
    const pairCountsByPosition = this.getPairCountsByPosition(previousResults, statsCount);

    pairCountsByPosition.forEach((pairCounts, index) => {
      Object.entries(pairCounts).forEach(([numberPair, count]) => {
        const numberCount = new NumberCount(new NumberPair(numberPair), new Count(count));
        this.statsCollection[index].addNumberCount(numberCount);
      });
    });
  }

  private getPairCountsByPosition(
    previousResults: string[],
    statsCount: number
  ): Record<string, number>[] {
    return Array.from({ length: statsCount }, (_, index) =>
      previousResults.reduce((acc, result) => {
        const pair = result.slice(index, index + 2);
        acc[pair] = (acc[pair] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    );
  }
}
