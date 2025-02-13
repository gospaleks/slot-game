import { useCallback, useContext, useState } from "react";
import { createContext } from "react";
import { GlobalContextType, Fruit } from "./types";

export const GlobalContext = createContext<GlobalContextType | null>(null);

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Slot values
  const [isAnimating, setIsAnimating] = useState<boolean[]>(
    Array(5).fill(false),
  );
  const [slotValues, setSlotValues] = useState<Fruit[][]>(
    generateRandomValues(true),
  );

  // Playe's initial credit and bet
  const [credit, setCredit] = useState(500);
  const [bet, setBet] = useState(10);

  function generateRandomValues(init: boolean): Fruit[][] {
    const values: Fruit[][] = [];
    for (let i = 0; i < 5; i++) {
      const row: Fruit[] = [];
      for (let j = 0; j < (init ? 23 : 20); j++) {
        row.push((Math.floor(Math.random() * 7) + 1) as Fruit);
      }
      if (!init) {
        row.push(...slotValues[i].splice(0, 3));
        // console.log(slotValues[i].splice(0, 3));
      }
      values.push(row);
    }
    return values;
  }

  const handleSpin = useCallback(() => {
    if (isAnimating.some((anim) => anim)) {
      return;
    }

    if (credit < bet) {
      alert("Not enough credit!");
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
