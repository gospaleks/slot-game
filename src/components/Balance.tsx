import { useSlots } from "../context";

const Balance = () => {
  const { credit, bet, setBet } = useSlots();

  const handleDecrease = () => setBet((prev) => Math.max(5, prev - 5));
  const handleIncrease = () => setBet((prev) => Math.min(credit, prev + 5));

  return (
    <div className="m-10 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-yellow-500 bg-gray-900 p-6 shadow-lg">
      {/* Credit Display */}
      <p className="text-3xl font-extrabold text-yellow-400">
        💰 Credit: <span className="text-white">{credit} RSD</span>
      </p>

      {/* Bet Controls */}
      <div className="flex items-center gap-6 rounded-lg border border-yellow-500 bg-gray-800 p-4 shadow-md">
        <button
          onClick={handleDecrease}
          className="flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-2xl font-bold text-white transition hover:bg-red-700"
        >
          -
        </button>

        <div className="flex h-14 w-24 items-center justify-center rounded-lg border border-yellow-400 bg-gray-700 text-2xl font-bold text-white shadow-md">
          {bet}
        </div>

        <button
          onClick={handleIncrease}
          className="flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-2xl font-bold text-white transition hover:bg-green-700"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Balance;
