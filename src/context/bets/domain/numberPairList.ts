import { NumberPair } from './numberPair';


export class NumberPairListPrimitives{
  pairList: string[]; 
}


export class NumberPairList {
  private pairList: NumberPair[];

  constructor(pairList?: NumberPair[]) {
    this.pairList = pairList ? pairList : [];
  }

  addNumberPair(numberPair: NumberPair): void {
    this.pairList.push(numberPair);
  }

  toPrimitives(): NumberPairListPrimitives {
    return {
      pairList: this.pairList.map((numberPair) => {
        return numberPair.toString();
      }
      )
    };
  }

  static fromPrimitives(numberPairListPrimitives: NumberPairListPrimitives): NumberPairList {

    const numberPairList: NumberPair[] = numberPairListPrimitives.pairList.map((num) => {
      return new NumberPair(num);
    });

    return new NumberPairList(numberPairList);
  }

}
