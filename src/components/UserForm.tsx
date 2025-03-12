import RandomColorGenerator from "@/functions/RandomColorGenerator";
import RandomIdGenerator from "@/functions/RandomIdGenerator";
import { useQuizContext } from "@/hooks/useQuizContext";
import { useState } from "react";
import Parse from "parse";

interface IRegisterUser {
  id: string;
  full_name: string;
  email: string;
  birth_date: Date;
  phone_number: string;
  createdAt: Date;
  photo: string;
}

const UserForm = ({
  gameId,
  allowGuest,
}: {
  gameId: string;
  allowGuest: boolean;
}) => {
  const { dispatch } = useQuizContext();

  const [formData, setFormData] = useState<IRegisterUser>({
    id: RandomIdGenerator(),
    full_name: "",
    email: "",
    birth_date: new Date(),
    phone_number: "",
    createdAt: new Date(),
    photo: RandomColorGenerator(),
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    game_id: string,
    value: IRegisterUser
  ) => {
    e.preventDefault();
    try {
      const result = await Parse.Cloud.run("addPlayers", { game_id, value });
      console.log(result);
      dispatch({ type: "CHANGE_STATE" });
    } catch (error) {
      console.log("Não foi possivel adicionar jogador!", error);
      return;
    }
  };

  return (
    <form
      className="flex flex-col h-full justify-between gap-4"
      onSubmit={(e) => handleSubmit(e, gameId, formData)}
    >
      <input
        type="text"
        placeholder="Insira seu nome"
        onChange={(e) => handleChange("full_name", e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Insira seu e-mail"
        onChange={(e) => handleChange("email", e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Insira sua data de nascimento"
        onChange={(e) => handleChange("birth_date", e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Insira seu celular"
        onChange={(e) => handleChange("phone_number", e.target.value)}
        required
      />

      <div className="flex gap-4 flex-col justify-center sm:flex-row-reverse">
        <button className="principal-button w-full" type="submit">
          Registrar
        </button>
        {allowGuest && (
          <button
            className="principal-button w-full"
            type="button"
            onClick={() => dispatch({ type: "CHANGE_STATE" })}
          >
            Jogar como convidado
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
