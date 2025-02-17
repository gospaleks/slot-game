import { useSlots } from "../context";
import { betValues } from "../utils/fruitPayouts";

const Balance = () => {
  const { credit, bet, setBet, currentWinning } = useSlots();

  const handleDecrease = () => {
    const currentIndex = betValues.indexOf(bet);
    if (currentIndex > 0) {
      setBet(betValues[currentIndex - 1]);
    }
  };

  const handleIncrease = () => {
    const currentIndex = betValues.indexOf(bet);
    if (
      currentIndex < betValues.length - 1 &&
      betValues[currentIndex + 1] <= credit
    ) {
      setBet(betValues[currentIndex + 1]);
    }
  };

  return (
    <div className="m-8 flex max-w-7xl flex-row items-center justify-center gap-4 rounded-lg border-2 border-yellow-500 bg-gray-900 p-6 shadow-lg">
      {/* Credit Display */}
      <div className="flex flex-col items-center px-8 text-3xl font-extrabold text-yellow-400">
        <span>💰 Credit:</span>
        <span className="text-white">{credit} RSD</span>
      </div>

      {/* Bet Controls */}
      <div className="flex items-center gap-6 rounded-lg border border-yellow-500 bg-gray-800 p-4 shadow-md">
        <button
          onClick={(e) => {
            handleDecrease();
            e.currentTarget.blur();
          }}
          className="flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-2xl font-bold text-white transition hover:bg-red-700"
        >
          -
        </button>

        <div className="flex h-14 w-24 items-center justify-center rounded-lg border border-yellow-400 bg-gray-700 text-2xl font-bold text-white shadow-md">
          {bet}
        </div>

        <button
          onClick={(e) => {
            handleIncrease();
            e.currentTarget.blur();
          }}
          className="flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-2xl font-bold text-white transition hover:bg-green-700"
        >
          +
        </button>
      </div>

      {/* Current Winning Display */}
      <div className="flex flex-col items-center px-8 text-2xl font-bold text-green-400">
        <span>🎉 Win:</span>
        <span className="text-white">{currentWinning} RSD</span>
      </div>
    </div>
  );
};

export default Balance;
