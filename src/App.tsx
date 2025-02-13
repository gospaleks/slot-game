import { FaArrowsSpin } from "react-icons/fa6";
import { GiCardExchange } from "react-icons/gi";
import { useSlots } from "./context";
import Slots from "./components/Slots";
import { useEffect, useState } from "react";
import Balance from "./components/Balance";
import Header from "./components/Header";
import Gambling from "./components/Gambling";

const App = () => {
  const { handleSpin, currentWinning } = useSlots();
  const [isGambling, setIsGambling] = useState(false);

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

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="container mx-auto p-10">
        <Header />
        <div className="flex flex-row items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center rounded-lg border border-yellow-500 bg-gray-900 p-4 shadow-lg">
            <div className="text-xl font-bold text-white">20 Lines</div>
          </div>
          <Slots />
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              onClick={handleSpin}
              className="rounded-lg bg-yellow-500 p-4 font-bold text-white hover:bg-yellow-600"
            >
              <FaArrowsSpin className="text-6xl" />
              <span className="mt-2 text-white">Spin</span>
            </button>
            <button
              disabled={currentWinning === 0}
              onClick={() => setIsGambling(true)}
              className="flex flex-col items-center justify-center rounded-lg border border-yellow-500 bg-gray-900 p-4 shadow-lg hover:bg-gray-800"
            >
              <GiCardExchange className="text-6xl text-red-500" />
              <span className="mt-2 font-bold text-white">Gamble</span>
            </button>
          </div>
        </div>
        {isGambling && <Gambling setIsGambling={setIsGambling} />}
        <Balance />
      </div>
    </div>
  );
};

export default App;
