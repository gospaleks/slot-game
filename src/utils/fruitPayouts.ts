import { Fruit, Result } from "../types";

// Vrednosti payout-a za svako voce
export const fruitPayouts: Record<Fruit, { 3: number; 4: number; 5: number }> =
  {
    [Fruit.Cherry]: { 3: 0.5, 4: 1, 5: 5 },
    [Fruit.Lemon]: { 3: 0.5, 4: 1, 5: 5 },
    [Fruit.Orange]: { 3: 0.5, 4: 1, 5: 5 },

    [Fruit.Plum]: { 3: 1, 4: 2, 5: 10 },
    [Fruit.Watermelon]: { 3: 1, 4: 2, 5: 10 },

    [Fruit.Grapes]: { 3: 1, 4: 4, 5: 20 },

    [Fruit.Seven]: { 3: 2, 4: 20, 5: 50 },

    [Fruit.Star]: { 3: 5, 4: 20, 5: 500 }, // Specijalni simbol
  };

export const betValues = [10, 20, 40, 50, 100, 200, 500, 1000];

export const calculateWinnings = (
  winningLines: Result[],
  grid: Fruit[][],
  betAmount: number,
): number => {
  const winningFromLines = winningLines.reduce((total, win) => {
    const fruit = win.fruit as Fruit;
    const count = win.contiguosFruit as 3 | 4 | 5;

    if (!fruitPayouts[fruit] || !fruitPayouts[fruit][count]) return total;

    const payout = fruitPayouts[fruit][count];

    // Skaliranje prema betAmount
    return Math.round(total + betAmount * payout);
  }, 0);

  const numOfStars = grid.flat().filter((fruit) => fruit === Fruit.Star)
    .length as 3 | 4 | 5;

  const winningFromStars =
    (fruitPayouts[Fruit.Star][numOfStars] || 0) * betAmount;

  return winningFromLines + winningFromStars;
};
