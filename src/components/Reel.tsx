import { useEffect, useState } from "react";
import { useSlots } from "../context";
import { Fruit, Result } from "../types";
import winningLinesPositions from "../data/winningLines";

type Props = {
  index: number;
  winningLines: Result[];
};

const Reel = ({ index, winningLines }: Props) => {
  const { isAnimating, slotValues } = useSlots();

  const [displayValues, setDisplayValues] = useState<Fruit[]>([]);

  useEffect(() => {
    const values = slotValues[index];
    const newValues = [...values.slice(0, 3), ...values];
    setDisplayValues(newValues);
  }, [slotValues]);

  return (
    <div
      className="reel-container relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded border-4 border-yellow-400 bg-gray-900 text-white"
      style={
        {
          "--duration": `${0.8 + index * 0.25}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={`${isAnimating[index] ? "reel-spin" : ""} flex flex-col gap-2`}
        style={{ height: "384px", width: "142px" }}
      >
        {displayValues.map((value, i) => {
          // Proveravamo da li je trenutna pozicija (i, index) deo pobedničke linije
          const isWinningCell = winningLines.some((win) =>
            winningLinesPositions[win.line].some(
              ([row, col]) =>
                row === i && col === index && col < win.contiguosFruit,
            ),
          );

          return (
            <div
              key={i}
              style={{
                height: "128px",
                width: "128px",
                position: "absolute",
                top: `${i * 128}px`,
                left: 8,
                backgroundColor: isWinningCell
                  ? "rgba(255, 255, 0, 0.5)"
                  : "transparent",
              }}
            >
              <img
                src={`/src/assets/fruits/${value}.png`}
                alt={`fruit-${value}`}
                className="h-full w-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reel;
