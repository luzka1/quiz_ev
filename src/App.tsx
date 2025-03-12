import "@/App.css";
import Quiz from "@/components/Quiz";
import Welcome from "@/components/Welcome";
import { useQuizContext } from "@/hooks/useQuizContext";
import { useGameConfigContext } from "@/hooks/useConfigContext";
import Background from "./components/Background";
import { useEffect, useState } from "react";
import GameOver from "@/components/GameOver";
import Loading from "@/components/Loading";
import Register from "./components/Register";

function App() {
  const { dispatch, state } = useQuizContext();
  const { dataConfig, loading, configError } = useGameConfigContext();
  const [gameColor, setGameColor] = useState<string>("#000");

  useEffect(() => {
    if (dataConfig?.questions) {
      dispatch({
        type: "SET_QUESTIONS",
        payload: { questions: dataConfig.questions },
      });
      dispatch({ type: "REORDER_QUESTIONS" });
    }
  }, [dataConfig]);

  useEffect(() => {
    const ChangeGameColor = () => {
      if (dataConfig.game_color) {
        setGameColor(dataConfig.game_color);
        document.documentElement.style.setProperty(
          "--principal-color",
          gameColor
        );
      }
      return;
    };
    ChangeGameColor();
  }, [dataConfig, gameColor]);

  return (
    <div className="flex flex-col justify-center items-center overflow-hidden h-dvh max-h-dvh">
      {configError ? (
        <div className="fixed h-screen w-full flex items-center justify-center bg-black">
          <p>
            Algum erro ocorreu com o aplicativo, por favor tente novamente mais
            tarde!
          </p>
        </div>
      ) : loading ? (
        <Loading />
      ) : (
        <>
          <Background color={gameColor} />
          {state.gameStage === "Start" && (
            <Welcome companyName={dataConfig.company_name} />
          )}
          {state.gameStage === "Registering" && (
            <Register
              gameId={dataConfig.game_id}
              allowGuest={dataConfig.allow_guest}
            />
          )}
          {state.gameStage === "Playing" && <Quiz />}
          {state.gameStage === "End" && <GameOver />}
        </>
      )}
    </div>
  );
}

export default App;
