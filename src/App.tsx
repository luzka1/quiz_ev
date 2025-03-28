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
  const { fetchAppConfig, dataConfig, loading, configError, setConfigError } =
    useGameConfigContext();
  const [gameParam, setGameParam] = useState<string | null>(null);

  console.log(dataConfig);

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    const gameIdParam = urlParam.get("game_id");
    setGameParam(gameIdParam ? gameIdParam : null);

    if (gameParam) {
      setConfigError(false);
      fetchAppConfig(gameParam);
    } else {
      setConfigError(true);
    }
  }, [gameParam]);

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
        document.documentElement.style.setProperty(
          "--principal-color",
          dataConfig.game_color
        );
      }
      return;
    };
    ChangeGameColor();
  }, [dataConfig, dataConfig.game_color]);

  return (
    <div className="flex flex-col justify-center items-center overflow-hidden h-dvh max-h-dvh">
      {configError ? (
        <div className="fixed h-screen w-full flex items-center justify-center bg-black max-w-[90vw]">
          <p>
            Algum erro ocorreu com o aplicativo, por favor tente novamente mais
            tarde!
          </p>
        </div>
      ) : loading ? (
        <Loading />
      ) : (
        <>
          <Background color={dataConfig.game_color} />
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
