import winningLinesPositions from "../data/winningLines";
import { Fruit, Result } from "../types";

const showWinningLines = (grid: Fruit[][]) => {
  let winningLines: Result[] = [];

  // Za svaku liniju
  winningLinesPositions.forEach((line, index) => {
    let win = true;
    let firstFruit: number | null = null;
    let numOfContiguousFruits: number = 0;

    // Za svaku poziciju u liniji
    for (let i = 0; i < line.length; i++) {
      let pos = line[i];
      let row = pos[0];
      let col = pos[1];
      let fruit = grid[row][col];

      // Ako je zvezda prekida se lanac
      if (fruit === Fruit.Star) {
        if (numOfContiguousFruits >= 3) win = true;
        else win = false;

        break;
      }

      if (firstFruit === null) {
        if (fruit !== 7) firstFruit = fruit;
        ++numOfContiguousFruits;
      } else if (win && fruit === firstFruit) ++numOfContiguousFruits;
      else if (win && fruit !== firstFruit && fruit === Fruit.Seven)
        ++numOfContiguousFruits;
      else {
        win = false;
      }
    }

    // Ako imamo lanac od 3 ili vise
    if (numOfContiguousFruits >= 3) {
      winningLines.push({
        line: index,
        contiguosFruit: numOfContiguousFruits,
        fruit: firstFruit === null ? Fruit.Seven : firstFruit,
      });

      console.log(line, numOfContiguousFruits);
    }
  });

  return winningLines;
};

export default showWinningLines;
