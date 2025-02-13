import { useSlots } from "../context";

const CardHistory = () => {
  const { cardHistory } = useSlots();

  return (
    <div className="mt-4 flex flex-col items-center">
      <h3 className="mb-2 text-lg font-bold text-yellow-400">CARD HISTORY</h3>
      <div className="flex gap-2 overflow-x-auto rounded-lg border border-gray-700 bg-gray-800 p-2 shadow-md">
        {cardHistory.length === 0 ? (
          <span className="text-gray-400">No history yet</span>
        ) : (
          cardHistory
            .slice(0, 5)
            .map((color, index) => (
              <div
                key={index}
                className={`flex h-12 w-8 items-center justify-center rounded-lg border-2 shadow-md transition-all duration-300 ${
                  color === "red"
                    ? "border-red-400 bg-red-600"
                    : "border-gray-500 bg-black"
                }`}
              ></div>
            ))
        )}
      </div>
    </div>
  );
};

export default CardHistory;
