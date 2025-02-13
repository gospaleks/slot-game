import { Fruit } from "../types";

// Convert slotValues to a grid for calculation winning lines
const convertToGrid = (values: Fruit[][]) => {
  let cols: Fruit[][] = [];

  for (let i = 0; i < 5; i++) {
    let col: Fruit[] = [];
    for (let j = 0; j < 3; j++) {
      col.push(values[i][j]);
    }
    cols.push(col);
  }

  // convert cols to rows
  let newGrid: Fruit[][] = [];
  for (let i = 0; i < 3; i++) {
    let row: Fruit[] = [];
    for (let j = 0; j < 5; j++) {
      row.push(cols[j][i]);
    }
    newGrid.push(row);
  }

  return newGrid;
};

export default convertToGrid;
