import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { QuizProvider } from "@/context/quiz.tsx";
import { GameConfigProvider } from "./context/config";
import Parse from "parse";

Parse.initialize(
  "nQpo9HdkNte5SwE9FFRpuw0TiI3M09CjkU8ws1on",
  "wiyqsvL2rgSXBk6ASWMy2zi2EZc24gX6XrT77twP"
);
Parse.serverURL = "https://parseapi.back4app.com/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameConfigProvider>
      <QuizProvider>
        <App />
      </QuizProvider>
    </GameConfigProvider>
  </StrictMode>
);
