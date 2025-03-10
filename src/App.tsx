import "@/App.css";
import Quiz from "@/components/Quiz";
import Welcome from "@/components/Welcome";
import { useQuizContext } from "@/hooks/useQuizContext";
import Background from "./components/Background";
import { useEffect } from "react";
import GameOver from "./components/GameOver";
import Parse from "parse";

function App() {
  const { dispatch, state } = useQuizContext();

  useEffect(() => {
    dispatch({ type: "REORDER_QUESTIONS" });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center overflow-hidden h-dvh max-h-dvh">
      <Background color="#e60076" />
      {state.gameStage === "Start" && <Welcome />}
      {state.gameStage === "Playing" && <Quiz />}
      {state.gameStage === "End" && <GameOver />}
    </div>
  );
}

export default App;
