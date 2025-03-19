import { useState } from "react";
import { useSlots } from "../context";

const CreditSettings = () => {
  const { setCredit } = useSlots();
  const [newCredit, setNewCredit] = useState(500);

  const handleStartNewGame = () => {
    setCredit(newCredit);
    // Add logic to close the modal if needed
  };

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-80">
      <div className="rounded-2xl border border-yellow-500 bg-gray-900 p-12 text-center text-white shadow-lg">
        <div>
          <h1 className="mb-2 text-4xl font-bold">Welcome to Ćaciland Slot</h1>
          <p className="mb-4 text-sm text-zinc-300">
            Any resemblance of symbols to actual characters is purely
            coincidental
          </p>
        </div>
        <div className="border-b border-t border-yellow-500 p-4">
          <h2 className="mb-4 text-left text-2xl font-bold">Set Your Credit</h2>
          <input
            type="number"
            value={newCredit}
            onChange={(e) => setNewCredit(Number(e.target.value))}
            className="mb-4 w-full rounded border border-gray-300 p-2 text-black"
          />
          <button
            onClick={handleStartNewGame}
            className="w-full rounded bg-yellow-500 p-2 font-bold text-white hover:bg-yellow-600"
          >
            Start Game
          </button>
        </div>
        <p className="mt-4 text-sm text-zinc-500">
          This game is made for fun and has no commercial purpose.
        </p>
      </div>
    </div>
  );
};

export default CreditSettings;
