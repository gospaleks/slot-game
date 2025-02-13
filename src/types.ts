export enum Fruit {
  Cherry = 1,
  Lemon,
  Orange,
  Grapes,
  Plum,
  Watermelon,
  Seven,
}

export type Result = {
  line: number;
  contiguosFruit: number;
  fruit: Fruit;
  color: string;
};

export type GlobalContextType = {
  isAnimating: boolean[];
  slotValues: Fruit[][];
  handleSpin: () => void;
  credit: number;
  setCredit: (credit: number | ((prev: number) => number)) => void;
  bet: number;
  setBet: (bet: number | ((prev: number) => number)) => void;
};
