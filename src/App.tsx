import { FaArrowsSpin, FaGithub } from "react-icons/fa6";
import { GiCardExchange } from "react-icons/gi";
import { MdOutlineReplay } from "react-icons/md";
import { FaStop } from "react-icons/fa";
import { useSlots } from "./context";
import Slots from "./components/Slots";
import { useEffect, useState } from "react";
import Balance from "./components/Balance";
import Header from "./components/Header";
import Gambling from "./components/Gambling";

import RTPTester from "./utils/RTPTester";
import CreditSettings from "./components/CreditSettings";

const App = () => {
  const {
    handleSpin,
    currentWinning,
    credit,
    isAnimating,
    numberOfWinningLines,
  } = useSlots();
  const [isGambling, setIsGambling] = useState(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false); // za animaciju dugmeta
  const [isGameOver, setIsGameOver] = useState(false); // za prikazivanje modal-a

  // Dodajemo event listener za space i g key
  useEffect(() => {
    // Ako je spin u toku, korisnik ne moze da koristi space ili g key
    if (isGambling || isAutoSpinning || isAnimating.some((anim) => anim)) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        startSpin();
      } else if (
        (event.key === "ArrowUp" || event.key === "ArrowDown") &&
        currentWinning > 0
      ) {
        setIsGambling(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSpin, isGambling, isAutoSpinning, isAnimating, currentWinning]);

  // Auto spin effect
  useEffect(() => {
    if (isAutoSpinning) {
      const interval = setInterval(() => {
        startSpin();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAutoSpinning, handleSpin]);

  useEffect(() => {
    if (
      credit === 0 &&
      currentWinning === 0 &&
      isAnimating.every((anim) => anim === false)
    ) {
      setIsGameOver(true);
    } else {
      setIsGameOver(false);
    }
  }, [credit, currentWinning, isAnimating]);

  const startSpin = () => {
    handleSpin();
    setIsSpinning(true); // Pokrece animaciju dugmeta
    setTimeout(() => setIsSpinning(false), 500); // Resetuje animaciju posle 0.5s
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {isGameOver && <CreditSettings />}

      <div className="mx-auto p-10">
        {/* <RTPTester /> */}

        <Header />

        {/* Slot i dugme za spin i gamble */}
        <div className="flex flex-row items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center rounded-lg border border-yellow-500 bg-gray-900 p-4 shadow-lg">
            <div className="text-center text-xl font-bold text-white">
              <p>{numberOfWinningLines} of 20</p>
              <p>Lines</p>
            </div>
          </div>

          <Slots />

          <div className="flex flex-col items-center justify-center gap-4">
            <button
              onClick={() => setIsAutoSpinning(!isAutoSpinning)}
              className="flex flex-col items-center justify-center gap-1 rounded-lg border border-yellow-500 bg-gray-900 px-4 py-3 text-white shadow-md transition hover:bg-gray-800 active:scale-95"
            >
              {isAutoSpinning ? (
                <FaStop className="text-5xl text-yellow-500 drop-shadow-md" />
              ) : (
                <MdOutlineReplay className="text-5xl text-yellow-400 drop-shadow-md" />
              )}
              <span className="text-sm font-medium tracking-wide text-yellow-400">
                {isAutoSpinning ? "Stop" : "Auto Spin"}
              </span>
            </button>

            <button
              onClick={startSpin}
              disabled={isAutoSpinning}
              className="flex flex-col items-center justify-center gap-1 rounded-lg border border-yellow-500 bg-yellow-500 px-4 py-3 text-white shadow-md transition hover:bg-yellow-600 active:scale-95"
            >
              <FaArrowsSpin
                className={`p-1 text-8xl drop-shadow-md ${isSpinning ? "animate-spinOnce" : ""}`}
              />
            </button>

            <button
              disabled={isAutoSpinning || currentWinning === 0}
              onClick={(e) => {
                setIsGambling(true);
                e.currentTarget.blur();
              }}
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

        {/* Upustvo i copyright */}
        <div className="flex items-center justify-center gap-6 text-sm text-neutral-300">
          <p>
            Press <span className="font-bold">SPACE</span> to spin.
          </p>
          <span>|</span>
          <p>
            Press <span className="font-bold">GAMBLE (↑ or ↓)</span> to start
            gambling.
          </p>
          <span>|</span>
          <span className="font-semibold text-neutral-200">
            <a
              href="https://github.com/gospaleks"
              className="flex items-center transition duration-300 hover:text-yellow-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              developed by <FaGithub className="mx-1" />
              gospaleks
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
