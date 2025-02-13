import Reel from "./Reel";
import { useSlots } from "../context";
import { useEffect, useState } from "react";
import { Fruit, Result } from "../types";
import convertToGrid from "../utils/convertToGrid";
import showWinningLines from "../utils/showWinningLines";
import winningLinesPositions from "../data/winningLines";

const Slots = () => {
  const numOfReels = 5;
  const { isAnimating, slotValues } = useSlots();

  const [grid, setGrid] = useState<Fruit[][]>(convertToGrid(slotValues));
  const [winningLines, setWinningLines] = useState<Result[]>([]);

  // Konvertujemo slotValues u grid kada animacija počne
  useEffect(() => {
    if (isAnimating.some((anim) => anim)) return; // Čekamo da svi reel-ovi završe
    setGrid(convertToGrid(slotValues));
  }, [isAnimating, slotValues]);

  // Računamo pobedničke linije kada su svi reel-ovi završili animaciju
  useEffect(() => {
    if (isAnimating.some((anim) => anim)) {
      setWinningLines([]); // Resetujemo linije dok se slotovi okreću
    } else {
      setWinningLines(showWinningLines(grid)); // Računamo linije kad animacija stane
    }
  }, [isAnimating, grid]);

  const reelWidth = 182;
  const reelHeight = 128;

  return (
    <div className="relative">
      {/* Grid slotova */}
      <div className="relative flex items-center justify-center gap-10">
        {[...Array(numOfReels)].map((_, i) => (
          <Reel key={i} index={i} winningLines={winningLines} />
        ))}
      </div>

      {/* SVG za pobednicke linije */}
      <svg className="pointer-events-none absolute left-0 top-0 h-full w-full">
        {winningLines.map((win, index) => {
          // Koordinate za crtez linije
          const lineCoords = winningLinesPositions[win.line]
            .slice(0, win.contiguosFruit)
            .map(
              ([row, col]) =>
                `${col * reelWidth + reelWidth / 2},${row * reelHeight + reelHeight / 2}`,
            )
            .join(" ");

          return (
            <polyline
              key={index}
              points={lineCoords}
              stroke={win.color}
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Slots;
