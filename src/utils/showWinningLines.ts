import winningLinesPositions from "../data/winningLines";
import { Fruit, Result } from "../types";
import getRandomLightColor from "./getRandomLightColor";

const showWinningLines = (grid: Fruit[][]) => {
  let winningLines: Result[] = [];

  winningLinesPositions.forEach((line, index) => {
    let win = true;
    let firstFruit: number | null = null;
    let numOfContiguousFruits: number = 0;

    line.forEach((pos) => {
      let row = pos[0];
      let col = pos[1];
      let fruit = grid[row][col];

      if (firstFruit === null) {
        if (fruit !== 7) firstFruit = fruit;
        ++numOfContiguousFruits;
      } else if (win && fruit === firstFruit) ++numOfContiguousFruits;
      else if (win && fruit !== firstFruit && fruit === Fruit.Seven)
        ++numOfContiguousFruits;
      else {
        win = false;
      }
    });

    if (numOfContiguousFruits >= 3) {
      winningLines.push({
        line: index,
        contiguosFruit: numOfContiguousFruits,
        fruit: firstFruit === null ? Fruit.Seven : firstFruit,
        color: getRandomLightColor(),
      });

      console.log(line, numOfContiguousFruits);
    }
  });

  return winningLines;
};

export default showWinningLines;
