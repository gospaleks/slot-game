import { useSlots } from "./context";
import Slots from "./components/Slots";
import { useEffect } from "react";
import Balance from "./components/Balance";

const App = () => {
  const { handleSpin } = useSlots();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        handleSpin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSpin]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-800">
      <div className="container mx-auto p-10">
        <div className="flex flex-row items-center justify-center gap-10">
          <Slots />
          <button
            onClick={handleSpin}
            className="rounded-lg bg-yellow-500 p-8 text-4xl font-bold text-white hover:bg-yellow-700"
          >
            SPIN
          </button>
        </div>
        <Balance />
      </div>
    </div>
  );
};

export default App;
