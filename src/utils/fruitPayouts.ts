import { Fruit, Result } from "../types";

// Vrednosti payout-a za svako voce
const fruitPayouts: Record<Fruit, { 3: number; 4: number; 5: number }> = {
  [Fruit.Cherry]: { 3: 0.5, 4: 1, 5: 5 },
  [Fruit.Lemon]: { 3: 0.5, 4: 1, 5: 5 },
  [Fruit.Orange]: { 3: 0.5, 4: 1, 5: 5 },

  [Fruit.Plum]: { 3: 1, 4: 2, 5: 10 },
  [Fruit.Watermelon]: { 3: 1, 4: 2, 5: 10 },

  [Fruit.Grapes]: { 3: 1, 4: 4, 5: 20 },

  [Fruit.Seven]: { 3: 2, 4: 20, 5: 50 },
};

// Tezine voca za custom distribuciju
const weightedFruits: { fruit: Fruit; weight: number }[] = [
  { fruit: Fruit.Cherry, weight: 30 },
  { fruit: Fruit.Lemon, weight: 30 },
  { fruit: Fruit.Orange, weight: 20 },

  { fruit: Fruit.Plum, weight: 15 },
  { fruit: Fruit.Watermelon, weight: 15 },

  { fruit: Fruit.Grapes, weight: 10 },
  { fruit: Fruit.Seven, weight: 5 },
];

export const betValues = [10, 20, 40, 50, 100, 200, 500, 1000];

// Custom distribucija voca
export const getRandomFruit = (): Fruit => {
  const totalWeight = weightedFruits.reduce(
    (sum, item) => sum + item.weight,
    0,
  );
  const randomNum = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const item of weightedFruits) {
    cumulativeWeight += item.weight;
    if (randomNum <= cumulativeWeight) {
      return item.fruit;
    }
  }

  return Fruit.Cherry; // Default (nikad se ne bi desilo)
};

export const calculateWinnings = (
  winningLines: Result[],
  betAmount: number,
): number => {
  return winningLines.reduce((total, win) => {
    const fruit = win.fruit as Fruit;
    const count = win.contiguosFruit as 3 | 4 | 5;

    if (!fruitPayouts[fruit] || !fruitPayouts[fruit][count]) return total;

    const payout = fruitPayouts[fruit][count];

    // Skaliranje prema betAmount
    return Math.round(total + betAmount * payout);
  }, 0);
};
