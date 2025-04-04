export class GuessNumber {
  number: string;

  constructor(number: string) {
    this.number = number;
  }

  toString(): string {
    return this.number;
  }

  concatNumber(number: string): void {
    this.number = this.number.concat(number);
  }
}
