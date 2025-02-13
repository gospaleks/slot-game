import { useState } from "react";
import { useSlots } from "../context";
import Card from "./Card";

type Props = {
  setIsGambling: (isGambling: boolean) => void;
};

const Gambling = ({ setIsGambling }: Props) => {
  const { currentWinning, setCurrentWinning } = useSlots();
  const [potentialWin, setPotentialWin] = useState(currentWinning * 2);
  const [isWinning, setIsWinning] = useState(false);

  const handleChoice = () => {
    const isWin = Math.random() < 0.5; // 50% sansa za dobitak
    if (isWin) {
      setIsWinning(true);
      setTimeout(() => setIsWinning(false), 1000); // WIN traje 1 sekundu
      setCurrentWinning(potentialWin);
      setPotentialWin(potentialWin * 2);
    } else {
      setCurrentWinning(0);
      setIsGambling(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="w-[500px] rounded-2xl border border-yellow-500 bg-gray-900 p-6 text-center text-white shadow-lg">
        {/* Naslov i stanje */}
        <h2 className="mb-4 text-2xl font-bold">GAMBLE</h2>
        <div className="mb-4 flex items-center justify-between text-lg font-semibold text-yellow-400">
          <div className="flex flex-col">
            <span>GAMBLE AMOUNT</span>
            <span className="text-2xl text-neutral-100">{currentWinning}</span>
          </div>
          <div className="flex flex-col">
            <span>GAMBLE TO WIN</span>
            <span className="text-2xl text-neutral-100">{potentialWin}</span>
          </div>
        </div>

        {/* Karta */}
        <Card isWinning={isWinning} />

        {/* Dugmad za izbor */}
        <p className="mb-2 text-yellow-400">SELECT RED OR BLACK</p>
        <div className="mb-4 flex justify-center gap-6">
          <button
            onClick={handleChoice}
            className="rounded-full bg-red-600 px-6 py-3 font-bold text-white shadow-md transition hover:bg-red-700"
          >
            RED
          </button>
          <button
            onClick={handleChoice}
            className="rounded-full bg-black px-6 py-3 font-bold text-white shadow-md transition hover:bg-gray-800"
          >
            BLACK
          </button>
        </div>

        {/* Dugme za take win */}
        <div className="mt-4">
          <button
            onClick={() => setIsGambling(false)}
            className="rounded bg-green-600 px-4 py-2 font-bold text-white shadow-md transition hover:bg-green-700"
          >
            TAKE WIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gambling;
