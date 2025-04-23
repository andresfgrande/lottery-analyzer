import { BetNumbers } from './betNumbers';
import { GuessNumber } from './GuessNumber';
import { NumberPair } from './numberPair';
import { NumberPairList } from './numberPairList';

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
    //TODO REFACTOR
    const firstColumnIndex = 0;

   // const firstColumnEqualPairsAux = betNumbers.getPairsOfEqualNumbers(firstColumnIndex);
    const firstColumnEqualPairsAux = new NumberPairList([
      new NumberPair('00'),
      new NumberPair('11'),
      new NumberPair('22'),
      new NumberPair('33'),
      new NumberPair('44'),
      new NumberPair('55'),
      new NumberPair('66'),
      new NumberPair('77'),
      new NumberPair('88'),
      new NumberPair('99'),
    ]);
    const auxGuessList: GuessNumber[] = [];
    firstColumnEqualPairsAux.getNumberPairList().forEach((equalPair) => {
      const auxPairsStartingByNumber = betNumbers.getPairsStartingByNumber(
        1,
        equalPair.getSecondNumber(),
      );

      auxPairsStartingByNumber.getNumberPairList().forEach((pairColumn1) => {
        const newGuessNumber = new GuessNumber(equalPair.toString());
        newGuessNumber.concatNumber(pairColumn1.getSecondNumber());
        auxGuessList.push(newGuessNumber);
      });
    });

    const auxGuessList2: GuessNumber[] = [];
    auxGuessList.forEach((guessNumber) => {
      const auxPairsStartingByNumber = betNumbers.getPairsStartingByNumber(
        2,
        guessNumber.getLastDigit(),
      );

      auxPairsStartingByNumber.getNumberPairList().forEach((pairColumn2) => {
        const newGuessNumber = new GuessNumber(guessNumber.toString());
        newGuessNumber.concatNumber(pairColumn2.getSecondNumber());
        auxGuessList2.push(newGuessNumber);
      });
    });

    const auxGuessList3: GuessNumber[] = [];
    auxGuessList2.forEach((guessNumber) => {
      const auxPairsStartingByNumber = betNumbers.getPairsStartingByNumber(
        3,
        guessNumber.getLastDigit(),
      );

      auxPairsStartingByNumber.getNumberPairList().forEach((pairColumn3) => {
        const newGuessNumber = new GuessNumber(guessNumber.toString());
        newGuessNumber.concatNumber(pairColumn3.getSecondNumber());
        auxGuessList3.push(newGuessNumber);
      });
    });

    this.guessList = auxGuessList3;
  }
}
