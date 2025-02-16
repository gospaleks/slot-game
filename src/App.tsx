import { FaArrowsSpin } from "react-icons/fa6";
import { GiCardExchange } from "react-icons/gi";
import { MdOutlineReplay } from "react-icons/md";
import { useSlots } from "./context";
import Slots from "./components/Slots";
import { useEffect, useState } from "react";
import Balance from "./components/Balance";
import Header from "./components/Header";
import Gambling from "./components/Gambling";

const App = () => {
  const { handleSpin, currentWinning } = useSlots();
  const [isGambling, setIsGambling] = useState(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);

  // Dodajemo event listener za space key
  useEffect(() => {
    if (isGambling) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        handleSpin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSpin, isGambling]);

  // Auto spin effect
  useEffect(() => {
    if (isAutoSpinning) {
      const interval = setInterval(() => {
        handleSpin();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAutoSpinning, handleSpin]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="container mx-auto p-10">
        <Header />

        {/* Slot i dugme za spin i gamble */}
        <div className="flex flex-row items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center rounded-lg border border-yellow-500 bg-gray-900 p-4 shadow-lg">
            <div className="text-xl font-bold text-white">20 Lines</div>
          </div>
          <Slots />
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              onClick={() => setIsAutoSpinning(!isAutoSpinning)}
              className="flex flex-col items-center justify-center gap-1 rounded-lg border border-yellow-500 bg-gray-900 px-4 py-3 text-white shadow-md transition hover:bg-gray-800 active:scale-95"
            >
              <MdOutlineReplay className="text-5xl text-yellow-400 drop-shadow-md" />
              <span className="text-sm font-medium tracking-wide text-yellow-400">
                {isAutoSpinning ? "Stop" : "Auto Spin"}
              </span>
            </button>

            <button
              onClick={handleSpin}
              disabled={isAutoSpinning}
              className="flex flex-col items-center justify-center gap-1 rounded-lg border border-yellow-500 bg-yellow-500 px-4 py-3 text-white shadow-md transition hover:bg-yellow-600 active:scale-95"
            >
              <FaArrowsSpin className="text-8xl drop-shadow-md" />
            </button>

            <button
              disabled={isAutoSpinning || currentWinning === 0}
              onClick={() => setIsGambling(true)}
              className="flex flex-col items-center justify-center rounded-lg border border-yellow-500 bg-gray-900 p-4 shadow-lg hover:bg-gray-800 active:scale-95"
            >
              <GiCardExchange className="text-6xl text-red-500" />
              <span className="mt-2 font-bold text-white">Gamble</span>
            </button>
          </div>
        </div>

        {/* Prikazujemo Gambling komponentu kao modal */}
        {isGambling && <Gambling setIsGambling={setIsGambling} />}
        <Balance />
      </div>
    </div>
  );
};

export default App;
