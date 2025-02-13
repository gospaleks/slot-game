import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import GlobalContextProvider from "./context.tsx";

createRoot(document.getElementById("root")!).render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>,
);
