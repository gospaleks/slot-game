import Reel from "./Reel";
import { useSlots } from "../context";
import { useEffect, useState } from "react";
import { Fruit, Result } from "../types";
import convertToGrid from "../utils/convertToGrid";
import showWinningLines from "../utils/showWinningLines";
import winningLinesPositions from "../data/winningLines";
import { calculateWinnings } from "../utils/fruitPayouts";

const Slots = () => {
  const numOfReels = 5;
  const { isAnimating, slotValues, bet, setCurrentWinning } = useSlots();

  const [grid, setGrid] = useState<Fruit[][]>(convertToGrid(slotValues));
  const [winningLines, setWinningLines] = useState<Result[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Konvertujemo slotValues u grid kada animacija počne
  useEffect(() => {
    if (isAnimating.some((anim) => anim)) return;
    setGrid(convertToGrid(slotValues));
  }, [isAnimating, slotValues]);

  // Računamo pobedničke linije kada animacija stane
  useEffect(() => {
    if (isAnimating.some((anim) => anim)) {
      setWinningLines([]);
      setCurrentLineIndex(0); // Resetujemo linije kad počne spin
    } else {
      const lines = showWinningLines(grid);
      const winning = calculateWinnings(lines, bet);
      setCurrentWinning(winning);
      setWinningLines(lines);
    }
  }, [isAnimating, grid]);

  // Animacija linija - prikazujemo jednu po jednu
  useEffect(() => {
    if (winningLines.length === 0) return;

    const interval = setInterval(() => {
      setCurrentLineIndex((prevIndex) => (prevIndex + 1) % winningLines.length);
    }, 1000); // Menjamo liniju na svake 1 sekundu

    return () => clearInterval(interval);
  }, [winningLines]);

  const reelWidth = 168;
  const reelHeight = 128;

  return (
    <div className="relative">
      {/* Grid slotova */}
      <div className="relative flex items-center justify-center gap-10">
        {[...Array(numOfReels)].map((_, i) => (
          <Reel key={i} index={i} winningLines={winningLines} />
        ))}
      </div>

      {/* SVG za pobedničke linije */}
      <svg className="pointer-events-none absolute left-0 top-0 h-full w-full">
        {winningLines.length > 0 && (
          <polyline
            key={currentLineIndex}
            points={winningLinesPositions[winningLines[currentLineIndex].line]
              .slice(0, winningLines[currentLineIndex].contiguosFruit)
              .map(
                ([row, col]) =>
                  `${col * reelWidth + reelWidth / 2},${row * reelHeight + reelHeight / 2}`,
              )
              .join(" ")}
            stroke="gold"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
};

export default Slots;
