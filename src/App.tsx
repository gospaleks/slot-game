import { FaArrowsSpin } from "react-icons/fa6";
import { GiCardExchange } from "react-icons/gi";
import { useSlots } from "./context";
import Slots from "./components/Slots";
import { useEffect } from "react";
import Balance from "./components/Balance";

const App = () => {
  const { handleSpin, currentWinning } = useSlots();

  // Dodajemo event listener za space key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        handleSpin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSpin]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="container mx-auto p-10">
        <div className="mb-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-yellow-500">
            🎰 Slot Machine 🎰
          </h1>
          <span className="font-semibold text-neutral-200">by gospaleks</span>
        </div>
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
              onClick={() => alert("Not implemented yet!")}
              className="flex flex-col items-center justify-center rounded-lg border border-yellow-500 bg-gray-900 p-4 shadow-lg hover:bg-gray-800"
            >
              <GiCardExchange className="text-6xl text-red-500" />
              <span className="mt-2 text-white">Gamble</span>
            </button>
          </div>
        </div>
        <Balance />
      </div>
    </div>
  );
};

export default App;
