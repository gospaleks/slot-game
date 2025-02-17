export enum Fruit {
  Cherry = 1,
  Lemon,
  Orange,
  Watermelon,
  Plum,
  Grapes,
  Seven,
  Star,
}

export type Result = {
  line: number;
  contiguosFruit: number;
  fruit: Fruit;
};

export type GlobalContextType = {
  isAnimating: boolean[];
  slotValues: Fruit[][];
  handleSpin: () => void;
  credit: number;
  setCredit: (credit: number | ((prev: number) => number)) => void;
  bet: number;
  setBet: (bet: number | ((prev: number) => number)) => void;
  currentWinning: number;
  setCurrentWinning: (winning: number | ((prev: number) => number)) => void;
  cardHistory: string[];
  addToCardHistory: (color: string) => void;
  numberOfWinningLines: number;
  setNumberOfWinningLines: (lines: number | ((prev: number) => number)) => void;
};
