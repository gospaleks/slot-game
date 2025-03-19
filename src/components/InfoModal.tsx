import { useSlots } from "../context";
import { Fruit } from "../types";
import { fruitPayouts } from "../utils/fruitPayouts";

type Props = {
  setIsInfoModalOpen: (isInfoModalOpen: boolean) => void;
};

const InfoModal = ({ setIsInfoModalOpen }: Props) => {
  const { bet } = useSlots();

  const betContent = (fruit: Fruit) => {
    return (
      <>
        <span className="block text-white">
          3 ={" "}
          <span className="text-yellow-300">
            {fruitPayouts[fruit][3] * bet}
          </span>
        </span>
        <span className="block text-white">
          4 ={" "}
          <span className="text-yellow-300">
            {fruitPayouts[fruit][4] * bet}
          </span>
        </span>
        <span className="block text-white">
          5 ={" "}
          <span className="text-yellow-300">
            {fruitPayouts[fruit][5] * bet}
          </span>
        </span>
      </>
    );
  };

  return (
    <div
      onClick={() => setIsInfoModalOpen(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-80"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-[600px] rounded-2xl border border-yellow-500 bg-gray-900 p-6 text-center text-white shadow-lg"
      >
        <h2 className="mb-1 text-2xl font-bold">
          Ćacilend Slots - Payout Table
        </h2>
        <p className="mx-auto mb-4 max-w-sm text-sm text-zinc-400">
          The winnings are calculated based on your current bet.
        </p>
        <div className="mb-4 flex flex-col gap-4 text-lg font-semibold">
          {/* Cherry, Lemon, Orange */}
          <div className="flex flex-col items-center gap-2 rounded-lg border border-yellow-500 p-2">
            <div className="flex">
              <img
                src={`/src/assets/fruits/1.png`}
                className="mb-2 h-16 w-16"
              />
              <img
                src={`/src/assets/fruits/2.png`}
                className="mb-2 h-16 w-16"
              />
              <img
                src={`/src/assets/fruits/3.png`}
                className="mb-2 h-16 w-16"
              />
            </div>
            <div className="flex gap-8">{betContent(Fruit.Cherry)}</div>
          </div>

          {/* Watermelon, Plum */}
          <div className="flex flex-col items-center gap-2 rounded-lg border border-yellow-500 p-2">
            <div className="flex">
              <img
                src={`/src/assets/fruits/5.png`}
                className="mb-2 h-16 w-16"
              />
              <img
                src={`/src/assets/fruits/6.png`}
                className="mb-2 h-16 w-16"
              />
            </div>
            <div className="flex gap-8 text-left">
              <div className="flex gap-8">{betContent(Fruit.Plum)}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            {/* Grapes */}
            <div className="flex flex-1 flex-row items-center gap-2 rounded-lg border border-yellow-500 p-2">
              <img
                src={`/src/assets/fruits/4.png`}
                className="mb-2 h-16 w-16"
              />
              <div className="flex flex-col text-left">
                {betContent(Fruit.Grapes)}
              </div>
            </div>

            <div className="flex flex-1 flex-row items-center gap-2 rounded-lg border border-yellow-500 p-2">
              <img
                src={`/src/assets/fruits/8.png`}
                className="mb-2 h-16 w-16"
              />
              <div className="flex flex-col text-left">
                {betContent(Fruit.Star)}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 flex flex-row items-center gap-2 rounded-lg border border-yellow-500 p-2">
            <img src={`/src/assets/fruits/7.png`} className="mb-2 h-16 w-16" />
            <div className="flex gap-2 text-left">
              <div className="flex flex-col font-semibold">
                {betContent(Fruit.Seven)}
              </div>
              <span className="block flex-1 text-white">
                Substitutes for all symbols except{" "}
                <span className="text-yellow-300">Cash</span> symbol
              </span>
            </div>
          </div>
        </div>

        <p className="mb-4 text-sm text-zinc-400">
          Money values are not real and are used for demonstration purposes
          only.
        </p>

        <button
          onClick={() => setIsInfoModalOpen(false)}
          className="w-full rounded bg-green-600 px-4 py-2 font-bold text-white shadow-md transition hover:bg-green-700"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
