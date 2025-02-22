import { useEffect, useState } from "react";
import { useSlots } from "../context";
import Card from "./Card";
import CardHistory from "./CardHistory";
import useSound from "use-sound";
import gambleWinSound from "../assets/sounds/gamble-win-sound.mp3";
import gambleLoseSound from "../assets/sounds/gamble-lose-sound.mp3";

type Props = {
  setIsGambling: (isGambling: boolean) => void;
};

const Gambling = ({ setIsGambling }: Props) => {
  const { currentWinning, setCurrentWinning, addToCardHistory, takeWin } =
    useSlots();
  const [potentialWin, setPotentialWin] = useState(currentWinning * 2);
  const [isWinning, setIsWinning] = useState(false);
  const [isLost, setIsLost] = useState(false);

  const [playGambleWin] = useSound(gambleWinSound, { volume: 0.8 });
  const [playGambleLose] = useSound(gambleLoseSound, { volume: 0.8 });

  // Resetujemo fokus sa dugmica kada se otvori modal
  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);

  const handleChoice = (choice: "red" | "black") => {
    const isWin = Math.random() < 0.52; // 52% sansa za dobitak
    const newCard = isWin ? choice : choice === "red" ? "black" : "red";

    addToCardHistory(newCard); // Čuvamo kartu u istoriji

    if (isWin) {
      playGambleWin();
      setIsWinning(true);
      setTimeout(() => setIsWinning(false), 1000); // WIN traje 1 sekundu
      setCurrentWinning(potentialWin);
      setPotentialWin(potentialWin * 2);
    } else {
      playGambleLose();
      setCurrentWinning(0);
      setIsLost(true);
      setTimeout(() => setIsGambling(false), 1000); // LOST traje 1 sekundu
    }
  };

  const handleTakeWin = () => {
    takeWin();
    setIsGambling(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="w-[500px] rounded-2xl border border-yellow-500 bg-gray-900 p-6 text-center text-white shadow-lg">
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

        <div className="flex items-center justify-center gap-11">
          {/* Glavna karta i red/black dugmici */}
          <Card
            isWinning={isWinning}
            isLost={isLost}
            handleChoice={handleChoice}
            handleTakeWin={handleTakeWin}
          />
        </div>

        {/* Istorija prethodnih karata */}
        <CardHistory />

        {/* Take win dugme */}
        <div className="mt-4">
          <button
            onClick={handleTakeWin}
            className="rounded bg-green-600 px-4 py-2 font-bold text-white shadow-md transition hover:bg-green-700"
          >
            TAKE WIN
          </button>
        </div>

        {/* Upustvo */}
        <div className="mt-4 text-sm text-neutral-300">
          <p>
            Press <span className="font-bold">SPACE</span> to take win.
          </p>
          <p>
            Press <span className="font-bold">↑</span> for red card.
          </p>
          <p>
            Press <span className="font-bold">↓</span> for black card.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gambling;
