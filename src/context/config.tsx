import React, { createContext, useState } from "react";
import Parse from "parse";
import questions from "@/data/questions";

interface IGameConfig {
  id: string;
  game_id: string;
  game_color: string;
  company_name: string;
  company_link: string;
  allow_guest: boolean;
  questions: typeof questions;
  negative_message: string;
  neutral_message: string;
  positive_message: string;
}

interface IGameConfigContext {
  fetchAppConfig: (game_id: string | null) => Promise<void>;
  dataConfig: IGameConfig;
  loading: boolean;
  configError: boolean;
  setConfigError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameConfigContext = createContext<IGameConfigContext>(
  {} as IGameConfigContext
);

export const GameConfigProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dataConfig, setDataConfig] = useState<IGameConfig>({} as IGameConfig);
  const [loading, setLoading] = useState<boolean>(false);
  const [configError, setConfigError] = useState<boolean>(false);

  const fetchAppConfig = async (game_id: string | null) => {
    setLoading(true);

    // Simulação de carregamento
    await new Promise((resolve) => setTimeout(resolve, 1450));
    try {
      const result = await Parse.Cloud.run("getConfig", { game_id });

      console.log(result);

      if (result) {
        setDataConfig(result);
      } else {
        setConfigError(true);
      }
    } catch (error) {
      setConfigError(true);
      console.error("Erro ao buscar a configuracao do app:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GameConfigContext.Provider
      value={{
        fetchAppConfig,
        dataConfig,
        loading,
        configError,
        setConfigError,
      }}
    >
      {children}
    </GameConfigContext.Provider>
  );
};
