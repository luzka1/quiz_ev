import React, { createContext, useEffect, useState } from "react";
import Parse from "parse";
import questions from "@/data/questions";

interface IGameConfig {
  id: string;
  game_color: string;
  company_name: string;
  company_link: string;
  questions: typeof questions;
}

interface IGameConfigContext {
  dataConfig: IGameConfig;
  loading: boolean;
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

  const fetchAppConfig = async () => {
    setLoading(true);

    // Simulação de carregamento
    await new Promise((resolve) => setTimeout(resolve, 1450));
    try {
      const result = await Parse.Cloud.run("getConfig");
      if (result) {
        setDataConfig(result);
      }
    } catch (error) {
      console.error("Erro ao buscar a configuracao do app:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppConfig();
  }, []);

  return (
    <GameConfigContext.Provider
      value={{
        dataConfig,
        loading,
      }}
    >
      {children}
    </GameConfigContext.Provider>
  );
};
