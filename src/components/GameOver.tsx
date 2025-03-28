import { useQuizContext } from "@/hooks/useQuizContext";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import FlipCard from "./FlipCard/FlipCard";
import { useGameConfigContext } from "@/hooks/useConfigContext";

const GameOver = () => {
  const { dispatch, state } = useQuizContext();
  const [message, setMessage] = useState<string>("");
  const [cardBgColor, setBgColor] = useState<string>("");
  const { dataConfig } = useGameConfigContext();

  const setUserMessage = () => {
    const percentage = (state.score / state.questions.length) * 100;

    if (percentage <= 25) {
      setMessage(dataConfig.negative_message);
      setBgColor("#fb2c36");
      return;
    } else if (percentage <= 75) {
      setMessage(dataConfig.neutral_message);
      setBgColor("#efb100");
      return;
    } else {
      setMessage(dataConfig.positive_message);
      setBgColor("#00bc7d");
      return;
    }
  };

  useEffect(() => {
    setUserMessage();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        y: { type: "spring", visualDuration: 0.5, bounce: 0.5 },
      }}
      className="flex flex-col items-center gap-10"
    >
      <div className="text-center">
        <h1 className="text-2xl">Fim de jogo</h1>
        <p>
          Você acertou {state.score} de {state.questions.length} perguntas!
        </p>
      </div>

      <FlipCard bgColor={cardBgColor} message={message} />

      <div className="flex gap-4">
        <button
          className="principal-button"
          onClick={() =>
            dispatch({
              type: "NEW_GAME",
              payload: { questions: dataConfig.questions },
            })
          }
        >
          Jogar novamente
        </button>
      </div>
    </motion.div>
  );
};

export default GameOver;
