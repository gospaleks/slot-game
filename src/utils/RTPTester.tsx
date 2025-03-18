import { useEffect } from "react";
import simulateRTP from "./simulateRtp";

const RTPTester = () => {
  useEffect(() => {
    simulateRTP();
  }, []);

  return (
    <div className="text-center text-white">
      Pokrenuta simulacija RTP-a! Pogledaj konzolu.
    </div>
  );
};

export default RTPTester;
