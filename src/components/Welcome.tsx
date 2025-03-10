import { useQuizContext } from "@/hooks/useQuizContext";
import logo from "@/img/logo_quiz.png";
import * as motion from "motion/react-client";

const Welcome = () => {
  const { dispatch } = useQuizContext();

  return (
    <motion.div
      initial={{ opacity: 0, x: -150 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        x: { type: "spring", visualDuration: 0.8, bounce: 0.6 },
      }}
      className="flex flex-col text-center items-center gap-8"
    >
      <h2>Nome da empresa contratante</h2>

      <h1 className="text-5xl">Seja Bem-vindo ao</h1>

      <img src={logo} width={250} alt="logo do minigame"></img>

      <div className="flex flex-col gap-2 items-center">
        <p>Clique no botão abaixo para começar:</p>
        <button
          onClick={() => dispatch({ type: "CHANGE_STATE" })}
          className="principal-button w-fit"
        >
          Iniciar
        </button>
      </div>
    </motion.div>
  );
};

export default Welcome;
