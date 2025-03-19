import { RiInformation2Line } from "react-icons/ri";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
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

// import RTPTester from "./utils/RTPTester";
import CreditSettings from "./components/CreditSettings";
import InfoModal from "./components/InfoModal";

const App = () => {
  const {
    handleSpin,
    currentWinning,
    credit,
    isAnimating,
    numberOfWinningLines,
    isSoundOn,
    setIsSoundOn,
  } = useSlots();
  const [isGambling, setIsGambling] = useState(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false); // za animaciju dugmeta
  const [isGameOver, setIsGameOver] = useState(false); // za prikazivanje modal-a
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // za prikazivanje modal-a sa informacijama

  // Dodajemo event key listener-e
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

  // Game over effect
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

  // Toggle sound on/off
  const handleMuteSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  // Toggle info modal
  const handleInfoModal = () => {
    setIsInfoModalOpen(!isInfoModalOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {isGameOver && <CreditSettings />}
      {isInfoModalOpen && <InfoModal setIsInfoModalOpen={setIsInfoModalOpen} />}

      {/* Main container */}
      <div className="mx-auto py-4 sm:p-10">
        {/* <RTPTester /> */}

        <Header />

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
          {/* Broj pobednickih linija i sound on/off */}
          <div className="flex flex-row items-center justify-center gap-4 sm:flex-col">
            <div>
              <RiInformation2Line
                onClick={handleInfoModal}
                className="cursor-pointer text-4xl text-yellow-500 transition duration-200 hover:scale-110 sm:text-6xl"
              />
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg border border-yellow-500 bg-gray-900 p-2 shadow-lg sm:p-4">
              <div className="text-md text-center font-bold text-white sm:text-xl">
                <div className="flex flex-row items-center justify-center sm:flex-col">
                  <p>{numberOfWinningLines} of 20</p>
                  <p className="ml-2 sm:ml-0">Lines</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-yellow-500 bg-gray-900 p-3 shadow-lg">
              {isSoundOn ? (
                <FaVolumeUp
                  onClick={handleMuteSound}
                  className="text-md cursor-pointer text-yellow-500 transition duration-200 hover:scale-110 sm:text-3xl"
                />
              ) : (
                <FaVolumeMute
                  onClick={handleMuteSound}
                  className="text-md cursor-pointer text-white transition duration-200 hover:scale-110 sm:text-3xl"
                />
              )}
            </div>
          </div>

          {/* Slotovi */}
          <div className="sm:hidden">
            <Slots reelWidth={76} reelHeight={64} />
          </div>
          <div className="hidden sm:block">
            <Slots reelWidth={168} reelHeight={128} />
          </div>

          {/* Dugmici za spin, auto spin i gamble */}
          <div className="flex flex-row items-center justify-center gap-4 sm:flex-col">
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

        {/* Prikazujemo stanje balansa i izbor bet-a */}
        <Balance />

        {/* Upustvo i copyright */}
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-neutral-300 sm:flex-row sm:gap-6">
          <p className="hidden sm:block">
            Press <span className="font-bold">SPACE</span> to spin.
          </p>
          <span className="hidden sm:block">|</span>
          <p className="hidden sm:block">
            Press <span className="font-bold">GAMBLE (↑ or ↓)</span> to start
            gambling.
          </p>
          <span className="hidden sm:block">|</span>
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
