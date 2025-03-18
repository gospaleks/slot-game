import { useCallback, useContext, useState } from "react";
import { createContext } from "react";
import { GlobalContextType, Fruit } from "./types";
import reelStrips from "./data/reelStrips";
import { getRandomIndex, betValues } from "./utils/fruitPayouts";

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Slot values
  const [isAnimating, setIsAnimating] = useState<boolean[]>(
    Array(5).fill(false),
  );
  const [slotValues, setSlotValues] = useState<Fruit[][]>(
    generateRandomValues(true),
  );
  const [cardHistory, setCardHistory] = useState<string[]>([]);
  const [numberOfWinningLines, setNumberOfWinningLines] = useState(0);

  // Player's initial credit and bet
  const [credit, setCredit] = useState(0);
  const [currentWinning, setCurrentWinning] = useState(0);
  const [bet, setBet] = useState(10);

  // Sound on/off
  const [isSoundOn, setIsSoundOn] = useState(true);

  // RTP
  const [totalBet, setTotalBet] = useState(0);
  const [totalWin, setTotalWin] = useState(0);
  const [rtp, setRTP] = useState(0);
  const [numberOfSpins, setNumberOfSpins] = useState(0);

  const addToCardHistory = (color: string) => {
    setCardHistory((prev) => [color, ...prev.slice(0, 9)]); // Cuvamo max 10 poslednjih
  };

  function generateRandomValues(init: boolean): Fruit[][] {
    const values: Fruit[][] = [];

    for (let i = 0; i < 5; i++) {
      // Pozicija sa koje pocinje reel
      const randomIndex = getRandomIndex(reelStrips[i].length);
      // Dupliramo niz da bismo omogućili kružno uzimanje elemenata
      const reel = [...reelStrips[i], ...reelStrips[i]];
      if (init) {
        values.push(reel.slice(randomIndex, randomIndex + 23));
      } else {
        const selectedValues = reel.slice(randomIndex, randomIndex + 20);
        const rearrangedValues = [
          ...selectedValues.slice(3),
          ...selectedValues.slice(0, 3),
        ];
        values.push(rearrangedValues);
      }
    }

    return values;
  }

  const handleSpin = useCallback(() => {
    if (isAnimating.some((anim) => anim)) {
      return;
    }

    setCredit((prev) => prev + currentWinning);

    // Za RTP
    setTotalWin((prev) => prev + currentWinning); // Dodaj prethodni dobitak u totalW
    setTotalBet((prev) => prev + bet); // Dodaj bet u totalBet

    // Nema kredita
    if (credit < bet) {
      // Postavi bet na prvi moguci
      let newBet = 10;
      for (const beti of betValues) {
        if (credit >= beti) {
          newBet = beti;
        } else {
          break;
        }
      }

      // Ako ni taj nije moguci resetuj kredit da se pojavi modal za restart igre
      if (credit < newBet) setCredit(0);

      setBet(newBet);
      setCurrentWinning(0);
      return;
    }

    setCredit((prev) => prev - bet);

    const randomValues = generateRandomValues(false);
    setSlotValues((_) => randomValues);

    // Pokrećemo animaciju za svaki reel zasebno
    setIsAnimating(Array(5).fill(true));

    randomValues.forEach((_, index) => {
      setTimeout(
        () => {
          setIsAnimating((prev) => {
            const newAnim = [...prev];
            newAnim[index] = false; // Zaustavljamo pojedinačni reel
            return newAnim;
          });
        },
        800 + index * 250,
      ); // Svaki sledeći reel se zaustavlja sa malim zakašnjenjem
    });

    setRTP(calculateRTP());
    setNumberOfSpins((prev) => prev + 1);
  }, [bet, credit, isAnimating, generateRandomValues]);

  const takeWin = () => {
    setTotalWin((prev) => prev + currentWinning); // Za RTP
    setCredit((credit) => credit + currentWinning);
    setCurrentWinning(0);
  };

  const calculateRTP = () => {
    return totalBet === 0 ? 0 : (totalWin / totalBet) * 100;
  };

  return (
    <GlobalContext.Provider
      value={{
        isAnimating,
        slotValues,
        handleSpin,
        credit,
        setCredit,
        bet,
        setBet,
        currentWinning,
        setCurrentWinning,
        cardHistory,
        addToCardHistory,
        numberOfWinningLines,
        setNumberOfWinningLines,
        takeWin,
        totalBet,
        totalWin,
        rtp,
        numberOfSpins,
        isSoundOn,
        setIsSoundOn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for easier access to the context
export const useSlots = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useSlots must be used within a GlobalContextProvider");
  }
  return context;
};

export default GlobalContextProvider;
