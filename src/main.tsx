import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { QuizProvider } from "@/context/quiz.tsx";
import { GameConfigProvider } from "./context/config";
import Parse from "parse";

Parse.initialize(
  "309DqxsDwflG713KNeJbaMrDXYCTA3PWOOWyZoUW",
  "RPPPK5ycbL745gJgemVhmUVym1FAFIGiSrenF3Fq"
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
