import questions from "@/data/questions";
import { createContext, ReactNode, useReducer } from "react";

interface IQuizContext {
  state: typeof initialState;
  dispatch: React.Dispatch<QuizAction>;
}

interface IQuizState {
  gameStage: "Start" | "Registering" | "Playing" | "End";
  questions: typeof questions;
  currentQuestion: number;
  score: number;
  answerSelected: boolean;
}

const STAGES = ["Start", "Registering", "Playing", "End"] as const;

const initialState: IQuizState = {
  gameStage: STAGES[0],
  questions,
  currentQuestion: 0,
  score: 0,
  answerSelected: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QuizAction = { type: string; payload?: any };

const quizReducer = (state: IQuizState, action: QuizAction) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.payload.questions,
      };

    case "CHANGE_STATE": {
      const currentStage = STAGES.indexOf(state.gameStage);
      const nextStage = (currentStage + 1) % STAGES.length;
      return {
        ...state,
        gameStage: STAGES[nextStage],
      };
    }

    case "REORDER_QUESTIONS": {
      const reorderedQuestions = state.questions.sort(() => {
        return Math.random() - 0.5;
      });

      return {
        ...state,
        questions: reorderedQuestions,
      };
    }

    case "CHANGE_QUESTION": {
      const nextQuestion = state.currentQuestion + 1;
      let endGame = false;

      if (!state.questions[nextQuestion]) {
        endGame = true;
      }

      return {
        ...state,
        currentQuestion: nextQuestion,
        gameStage: endGame ? STAGES[3] : state.gameStage,
        answerSelected: false,
      };
    }

    case "NEW_GAME": {
      const initialQuestions = action.payload.questions;

      return {
        ...initialState,
        questions: initialQuestions,
      };
    }

    case "CHECK_ANSWER": {
      if (state.answerSelected) return state;

      const answer = action.payload.answer;
      const option = action.payload.option;
      let correctAnswer = 0;

      if (answer === option) correctAnswer = 1;

      return {
        ...state,
        score: state.score + correctAnswer,
        answerSelected: option,
      };
    }

    default:
      return state;
  }
};

export const QuizContext = createContext<IQuizContext>({} as IQuizContext);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const value = { state, dispatch };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
