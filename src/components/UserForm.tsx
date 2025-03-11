import { useState } from "react";

interface IRegisterUser {
  full_name: string;
  email: string;
  birth_date: Date;
  phone_number: string;
}

const UserForm = () => {
  const [formData, setFormData] = useState<IRegisterUser>({
    full_name: "",
    email: "",
    birth_date: new Date(),
    phone_number: "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const fetchRegisterUser = async () => {};

  return (
    <form className="flex flex-col h-full justify-between">
      <input
        type="text"
        placeholder="Insira seu nome"
        onChange={(e) => handleChange("full_name", e.target.value)}
      />
      <input
        type="email"
        placeholder="Insira seu e-mail"
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <input
        type="date"
        placeholder="Insira sua data de nascimento"
        onChange={(e) => handleChange("birth_date", e.target.value)}
      />
      <input
        type="text"
        placeholder="Insira seu celular"
        onChange={(e) => handleChange("phone_number", e.target.value)}
      />

      <div className="flex gap-4 flex-row-reverse">
        <button className="principal-button" type="submit">
          Registrar
        </button>
        <button className="principal-button" type="button">
          Jogar como convidado
        </button>{" "}
      </div>
    </form>
  );
};

export default UserForm;
