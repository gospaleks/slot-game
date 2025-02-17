import { useEffect } from "react";
import simulateRTP from "./simulateRtp";

const RTPTester = () => {
  useEffect(() => {
    simulateRTP();
  }, []);

  return <div>Pokrenuta simulacija RTP-a! Pogledaj konzolu.</div>;
};

export default RTPTester;
