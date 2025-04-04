import { BetId } from './betId';
import { CreationDate } from './creationDate';
import { BetNumbers, BetNumbersPrimitives } from './betNumbers';
import { NumberPair } from './numberPair';
import { Stats, StatsPrimitives } from './stats';
import { Guesses, GuessesPrimitives } from './Guesses';

export interface BetPrimitives {
  betId: string;
  creationDate: string;
  previousResults: string[];
  betNumbers: BetNumbersPrimitives;
  stats: StatsPrimitives;
  guesses: GuessesPrimitives;
}

export class Bet {
  private betId: BetId;
  private creationDate: CreationDate;
  private previousResults: string[];
  private betNumbers: BetNumbers;
  private stats: Stats;
  private guesses: Guesses;

  constructor(
    betId: BetId,
    creationDate: CreationDate,
    previousResults: string[],
    betNumbers: BetNumbers,
    stats: Stats,
    guesses: Guesses,
  ) {
    this.betId = betId;
    this.creationDate = creationDate;
    this.previousResults = previousResults;
    this.betNumbers = betNumbers;
    this.stats = stats;
    this.guesses = guesses;
  }

  getBetId(): string {
    return this.betId.toString();
  }

  toPrimitives(): BetPrimitives {
    return {
      betId: this.betId.toString(),
      creationDate: this.creationDate.toString(),
      previousResults: this.previousResults,
      betNumbers: this.betNumbers.toPrimitives(),
      stats: this.stats.toPrimitives(),
      guesses: this.guesses.toPrimitives(),
    };
  }

  static fromPrimitives(betPrimitives: BetPrimitives): Bet {
    return new Bet(
      new BetId(betPrimitives.betId),
      new CreationDate(betPrimitives.creationDate),
      betPrimitives.previousResults,
      BetNumbers.fromPrimitives(betPrimitives.betNumbers),
      Stats.fromPrimitives(betPrimitives.stats),
      Guesses.fromPrimitives(betPrimitives.guesses),
    );
  }

  generateBetNumbers(): void {
    this.betNumbers.generateBetNumberPairs(this.previousResults);
  }

  generateStats(): void {
    this.stats.generateStats(this.previousResults);
  }

  updatePreviousResults(previousResults: string[]): void {
    this.previousResults = previousResults;
  }

  generateGuesses(): void {
    this.guesses.generateGuesses(this.betNumbers);
  }
}
