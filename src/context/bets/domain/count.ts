export class Count {
  private count: number;
  constructor(count: number) {
    this.count = count;
  }
  toValue(): number {
    return this.count;
  }
}
