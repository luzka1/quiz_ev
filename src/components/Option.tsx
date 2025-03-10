import { useQuizContext } from "@/hooks/useQuizContext";

interface OptionProps {
  option: string;
  answer: string;
  selectOption: (option: string) => void;
}

const Option = ({ option, answer, selectOption }: OptionProps) => {
  const { state } = useQuizContext();

  return (
    <div
      onClick={() => selectOption(option)}
      className={`option-card w-full text-center ${
        state.answerSelected && option === answer ? "correct-option" : ""
      } ${state.answerSelected && option !== answer ? "wrong-option" : ""}`}
    >
      {option}
    </div>
  );
};

export default Option;
