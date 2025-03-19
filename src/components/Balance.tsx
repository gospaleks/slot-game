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
    <div className="m-2 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-yellow-500 bg-gray-900 p-3 shadow-lg sm:m-8 sm:mb-4 sm:flex-row sm:p-6">
      {/* Credit Display */}
      <div className="flex flex-row items-center px-8 text-2xl font-extrabold text-yellow-400 sm:flex-col sm:text-3xl">
        <span>💰 Credit:</span>
        <span className="ml-2 text-white sm:ml-0">{credit} RSD</span>
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
      <div className="flex flex-row items-center px-8 text-2xl font-bold text-green-400 sm:flex-col sm:text-3xl">
        <span>🎉 Win:</span>
        <span className="ml-2 text-white sm:ml-0">{currentWinning} RSD</span>
      </div>

      {/* RTP Display (for testing) */}
      {/* <div className="text-md hidden flex-col items-end px-8 font-bold text-white sm:flex">
        <div className="flex w-full justify-end">
          <span>🔄 Spins:</span>{" "}
          <span className="ml-2 text-yellow-500">{numberOfSpins}</span>
        </div>
        <div className="flex w-full justify-end">
          <span>📊 RTP:</span>{" "}
          <span className="ml-2 text-red-500">{rtp.toFixed(2)}%</span>
        </div>
        <div className="flex w-full justify-end">
          <span>💰 Total Bet:</span>{" "}
          <span className="ml-2 text-yellow-500">{totalBet} RSD</span>
        </div>
        <div className="flex w-full justify-end">
          <span>💰 Total Win:</span>{" "}
          <span className="ml-2 text-green-500">{totalWin} RSD</span>
        </div>
      </div> */}
    </div>
  );
};

export default Balance;
