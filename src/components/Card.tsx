import { useState, useEffect } from "react";

type Props = {
  isWinning: boolean;
};

const Card = ({ isWinning }: Props) => {
  const [color, setColor] = useState("red");
  const [showWin, setShowWin] = useState(false);

  useEffect(() => {
    if (isWinning) {
      setShowWin(true);
      setTimeout(() => setShowWin(false), 1000); // Prikazuje WIN 1 sekundu
    }
  }, [isWinning]);

  useEffect(() => {
    const interval = setInterval(() => {
      setColor((prev) => (prev === "red" ? "black" : "red"));
    }, 500); // Menja boju na svake 500ms dok igrač razmišlja

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-4 flex justify-center">
      <div
        className={`relative flex h-48 w-32 items-center justify-center rounded-xl border-4 border-white shadow-lg transition-all duration-300 ${
          showWin
            ? "animate-pulse border-yellow-400 bg-green-500"
            : color === "red"
              ? "border-red-400 bg-red-600"
              : "border-gray-500 bg-black"
        }`}
      >
        {showWin ? (
          <span className="absolute text-4xl font-extrabold text-yellow-300 drop-shadow-md">
            WIN
          </span>
        ) : (
          <span className="absolute text-5xl font-bold text-white drop-shadow-md">
            ?
          </span>
        )}

        {/* Efekat sjaja kad je WIN */}
        {showWin && (
          <div className="absolute h-full w-full animate-ping rounded-xl bg-yellow-300 opacity-50"></div>
        )}
      </div>
    </div>
  );
};

export default Card;
