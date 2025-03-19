export enum Fruit {
  Cherry = 1,
  Lemon,
  Orange,
  Grapes,
  Plum,
  Watermelon,
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
  takeWin: () => void;
  totalBet: number;
  totalWin: number;
  rtp: number;
  numberOfSpins: number;
  isSoundOn: boolean;
  setIsSoundOn: (isSoundOn: boolean) => void;
};
