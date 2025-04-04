export class NumberPair {
  constructor(private numbers: string) {}

  toString(): string {
    return this.numbers;
  }

  getFirstNumber(): string {
    return this.numbers[0];
  }

  getSecondNumber(): string {
    return this.numbers[1];
  }
}
