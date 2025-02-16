import { useCallback, useContext, useState } from "react";
import { createContext } from "react";
import { GlobalContextType, Fruit } from "./types";
import reelStrips from "./data/reelStrips";

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

  // Playe's initial credit and bet
  const [credit, setCredit] = useState(500);
  const [currentWinning, setCurrentWinning] = useState(0);
  const [bet, setBet] = useState(10);

  const addToCardHistory = (color: string) => {
    setCardHistory((prev) => [color, ...prev.slice(0, 9)]); // Čuvamo max 10 poslednjih
  };

  function generateRandomValues(init: boolean): Fruit[][] {
    const values: Fruit[][] = [];

    for (let i = 0; i < 5; i++) {
      // Pozicija sa koje pocinje reel
      const randomIndex = Math.floor(Math.random() * 40);
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

    if (credit < bet) {
      alert("Not enough credit!");
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
  }, [bet, credit, isAnimating, generateRandomValues]);

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
