import reelStrips from "../data/reelStrips";
import showWinningLines from "../utils/showWinningLines";
import { calculateWinnings } from "./fruitPayouts";
import { Fruit } from "../types";

const SPIN_COUNT = 1000000;
const BET_AMOUNT = 10;

const simulateRTP = () => {
  let totalBet = 0;
  let totalWin = 0;

  for (let i = 0; i < SPIN_COUNT; i++) {
    let grid: Fruit[][] = [];

    // Generisanje grid-a biranjem random indeksa za svaki reel
    for (let reel = 0; reel < 5; reel++) {
      // const startIndex = getRandomIndex(reelStrips[reel].length);
      const startIndex = Math.floor(Math.random() * reelStrips[reel].length);
      grid.push([
        reelStrips[reel][startIndex],
        reelStrips[reel][(startIndex + 1) % reelStrips[reel].length],
        reelStrips[reel][(startIndex + 2) % reelStrips[reel].length],
      ]);
    }

    // Transponuj grid
    grid = grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));

    // Provera dobitnih linija
    const winningLines = showWinningLines(grid);
    const winnings = calculateWinnings(winningLines, grid, BET_AMOUNT);

    totalBet += BET_AMOUNT;
    totalWin += winnings;
  }

  const RTP = (totalWin / totalBet) * 100;
  console.log(`Simulated RTP: ${RTP.toFixed(2)}%`);
  return RTP;
};

export default simulateRTP;
