import { BetNumbers } from './betNumbers';
import { GuessNumber } from './GuessNumber';

export interface GuessesPrimitives {
  guessList: string[];
}

export class Guesses {
  guessList: GuessNumber[];

  constructor(guessList?: GuessNumber[]) {
    this.guessList = guessList ? guessList : [];
  }

  toPrimitives(): GuessesPrimitives {
    const guesses = this.guessList.map((guessNumber) => {
      return guessNumber.toString();
    });
    return {
      guessList: guesses,
    };
  }

  static fromPrimitives(guessesPrimitives: GuessesPrimitives): Guesses {
    const guessList = guessesPrimitives.guessList.map((guess) => {
      return new GuessNumber(guess);
    });
    return new Guesses(guessList);
  }

  generateGuesses(betNumbers: BetNumbers): void {
    this.guessList = [];
    const firstColumnIndex = 0;

    //STEP 1
    const firstColumnEqualPairsAux = betNumbers.getPairsOfEqualNumbers(firstColumnIndex);

    //STEP 2
    const auxList: string[] = [];
    firstColumnEqualPairsAux.getNumberPairList().forEach((equalPair) => {
      const auxPairsStartingByNumber = betNumbers.getPairsStartingByNumber(
        1,
        equalPair.getSecondNumber(),
      );

      console.log(auxPairsStartingByNumber.toPrimitives());

      auxPairsStartingByNumber.getNumberPairList().forEach((pair) => {
        const newGuessNumber = new GuessNumber(equalPair.toString());
        newGuessNumber.concatNumber(pair.getSecondNumber());
        this.guessList.push(newGuessNumber);
      });
    });

    console.log(this.guessList);

    /*
    this.guessList = firstColumnEqualPairs.toPrimitives().pairList.map((pair) => {
      return new GuessNumber(pair);
    });
    */
  }
}
