import { Fruit, Result } from "../types";

// Vrednosti payout-a za svako voce
export const fruitPayouts: Record<Fruit, { 3: number; 4: number; 5: number }> =
  {
    [Fruit.Cherry]: { 3: 0.5, 4: 1, 5: 5 }, // sendvic
    [Fruit.Lemon]: { 3: 0.5, 4: 1, 5: 5 }, // vucic
    [Fruit.Orange]: { 3: 0.5, 4: 1, 5: 5 }, // caci

    [Fruit.Plum]: { 3: 1, 4: 2, 5: 10 }, // ruke su vam krvave
    [Fruit.Watermelon]: { 3: 1, 4: 2, 5: 10 }, // traktor

    [Fruit.Grapes]: { 3: 1, 4: 4, 5: 20 }, // sarovic

    [Fruit.Seven]: { 3: 2, 4: 20, 5: 50 }, // pumpaj

    [Fruit.Star]: { 3: 5, 4: 20, 5: 500 }, // cash
  };

export const betValues = [
  8, 10, 12, 16, 20, 30, 40, 80, 100, 120, 200, 400, 800, 1000,
];

// RNG
export const getRandomIndex = (reelLength: number): number => {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  return randomBuffer[0] % reelLength; // Skalira na opseg [0, reelLength - 1]
};

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
