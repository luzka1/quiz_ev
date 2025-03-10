import { useQuizContext } from "@/hooks/useQuizContext";
import Option from "./Option";
import * as motion from "motion/react-client";
import Card from "./UI/Card";

const Quiz = () => {
  const { dispatch, state } = useQuizContext();
  const currentQuestion = state.questions[state.currentQuestion];

  const onSelectOption = (option: string) => {
    dispatch({
      type: "CHECK_ANSWER",
      payload: { answer: currentQuestion.answer, option },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 150 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        x: { type: "spring", visualDuration: 0.5, bounce: 0.2 },
      }}
      className="flex flex-col gap-10 items-center"
    >
      <div className="flex flex-col items-center">
        <p>
          Pergunta {state.currentQuestion + 1} de {state.questions.length}
        </p>
        <h1 className="text-2xl text-center max-w-[90vw]">
          {currentQuestion.question}
        </h1>
      </div>
      <Card className="w-[450px] h-[350px] max-w-[80vw] p-6 flex flex-col justify-between ">
        {currentQuestion.options.map((option) => (
          <Option
            key={option}
            option={option}
            answer={currentQuestion.answer}
            selectOption={() => onSelectOption(option)}
          />
        ))}
      </Card>

      <button
        onClick={() =>
          state.answerSelected && dispatch({ type: "CHANGE_QUESTION" })
        }
        className={`principal-button opacity-0 cursor-default ${
          state.answerSelected && "opacity-100"
        }`}
      >
        Continuar
      </button>
    </motion.div>
  );
};

export default Quiz;
