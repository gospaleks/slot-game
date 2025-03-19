import Reel from "./Reel";
import { useSlots } from "../context";
import { useEffect, useState } from "react";
import { Fruit, Result } from "../types";
import convertToGrid from "../utils/convertToGrid";
import showWinningLines from "../utils/showWinningLines";
import winningLinesPositions from "../data/winningLines";
import { calculateWinnings } from "../utils/fruitPayouts";
import useSound from "use-sound";
import winLineSound1 from "../assets/sounds/classic-win.mp3";
import winLineSound2 from "../assets/sounds/classic-win-2.mp3";
import reelFallSound from "../assets/sounds/reel-fall.mp3";
import fiveOfAKindSound from "../assets/sounds/pumpaj.mp3";

type SlotsProps = {
  reelWidth: number;
  reelHeight: number;
};

const Slots = ({ reelWidth, reelHeight }: SlotsProps) => {
  const numOfReels = 5;
  const {
    isAnimating,
    slotValues,
    bet,
    setCurrentWinning,
    setNumberOfWinningLines,
    isSoundOn,
  } = useSlots();

  const [grid, setGrid] = useState<Fruit[][]>(convertToGrid(slotValues));
  const [winningLines, setWinningLines] = useState<Result[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const currentLineColor = "lime";

  const [isFiveOfAKind, setIsFiveOfAKind] = useState(false);

  // Sounds
  const [playWin1, { stop: stopWin1 }] = useSound(winLineSound1, {
    volume: 0.4,
  });
  const [playWin2, { stop: stopWin2 }] = useSound(winLineSound2, {
    volume: 0.4,
  });
  const [playFiveOfAKind, { stop: stopFiveOfAKind }] = useSound(
    fiveOfAKindSound,
    { volume: 0.4 },
  );
  const [playReelFall] = useSound(reelFallSound, { volume: 0.4 });
  const [isFallSoundOn, setIsFallSoundOn] = useState(false);

  // Resetujemo pobedničke linije ČIM spin krene
  useEffect(() => {
    if (isAnimating.some((anim) => anim)) {
      // Pokreni zvuk pada i resetuj ostale zvuke
      if (!isFallSoundOn && isSoundOn) {
        stopAllSounds();
        setIsFallSoundOn(true);
        playReelFall();
      }

      setWinningLines([]); // Reset
      setCurrentLineIndex(0);
      setIsFiveOfAKind(false);
    }
  }, [isAnimating]);

  // Kada se animacija završi, ažuriramo grid
  useEffect(() => {
    if (isAnimating.some((anim) => anim)) return;
    setGrid(convertToGrid(slotValues));
    setIsFallSoundOn(false);
  }, [isAnimating, slotValues]);

  // Kada se grid ažurira, računamo pobedničke linije
  useEffect(() => {
    if (isAnimating.some((anim) => anim) || winningLines.length > 0) return;

    const lines = showWinningLines(grid);
    const winning = calculateWinnings(lines, grid, bet);

    setCurrentWinning(winning);
    setWinningLines(lines);
    setNumberOfWinningLines(lines.length);
  }, [grid]);

  // Animacija linija - prikazujemo jednu po jednu
  useEffect(() => {
    if (winningLines.length === 0) return;

    const interval = setInterval(() => {
      setCurrentLineIndex((prevIndex) => (prevIndex + 1) % winningLines.length);
    }, 1000); // Menjamo liniju na svake 1 sekundu

    const hasFullLine = winningLines.some((line) => line.contiguosFruit === 5);
    if (hasFullLine) {
      setIsFiveOfAKind(true);
    }

    // Winning zvuci
    if (
      isSoundOn &&
      !isAnimating.some((anim) => anim) &&
      winningLines.length > 0
    ) {
      if (hasFullLine) {
        playFiveOfAKind();
      } else {
        const randomWinSound = Math.random() < 0.5 ? playWin1 : playWin2;
        randomWinSound();
      }
    }

    return () => clearInterval(interval);
  }, [winningLines]);

  const stopAllSounds = () => {
    stopWin1();
    stopWin2();
    stopFiveOfAKind();
  };

  return (
    <div className="relative">
      {/* Grid slotova */}
      <div className="relative flex items-center justify-center gap-3 sm:gap-10">
        {[...Array(numOfReels)].map((_, i) => (
          <Reel
            key={i}
            index={i}
            winningLines={winningLines}
            height={reelHeight}
          />
        ))}
      </div>

      {/* SVG za pobedničke linije */}
      <svg className="pointer-events-none absolute left-0 top-0 h-full w-full">
        {winningLines.length > 0 && (
          <>
            <polyline
              key={currentLineIndex}
              points={winningLinesPositions[winningLines[currentLineIndex].line]
                .map(
                  ([row, col]) =>
                    `${col * reelWidth + reelWidth / 2 - (reelWidth < 128 ? 8 : 24)},${row * reelHeight + reelHeight / 2}`,
                )
                .join(" ")}
              stroke={currentLineColor}
              strokeWidth={reelWidth < 128 ? 2 : 3}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {winningLinesPositions[winningLines[currentLineIndex].line].map(
              ([row, col], index) =>
                index < winningLines[currentLineIndex].contiguosFruit && (
                  <g key={index}>
                    <rect
                      x={col * reelWidth + (reelWidth < 128 ? 2 : 4)}
                      y={row * reelHeight + (reelWidth < 128 ? 2 : 4)}
                      width={reelHeight}
                      height={reelHeight}
                      fill="none"
                      stroke={currentLineColor}
                      strokeWidth={reelWidth < 128 ? 2 : 4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                ),
            )}
          </>
        )}
      </svg>

      {/* Big win natips kad ima peterac */}
      {isFiveOfAKind && (
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full text-white">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="rounded-lg border-4 border-yellow-300 bg-gray-900 p-6 font-casino text-3xl text-amber-300 shadow-md shadow-white sm:p-10 sm:text-5xl">
              🎉 BIG WIN 🎉
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slots;
