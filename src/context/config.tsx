import React, { createContext, useEffect, useState } from "react";
import Parse from "parse";

interface IGameConfig {
  id: string;
  game_color: string;
}

interface IGameConfigContext {
  dataConfig?: IGameConfig;
}

export const GameConfigContext = createContext<IGameConfigContext>(
  {} as IGameConfigContext
);

export const GameConfigProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dataConfig, setDataConfig] = useState<IGameConfig>();

  const fetchAppConfig = async () => {
    try {
      const result: IGameConfig = await Parse.Cloud.run("getConfig");
      setDataConfig(result);
    } catch (error) {
      console.error("Erro ao buscar a configuracao do app:", error);
    }
  };

  useEffect(() => {
    fetchAppConfig();
  }, []);

  return (
    <GameConfigContext.Provider
      value={{
        dataConfig,
      }}
    >
      {children}
    </GameConfigContext.Provider>
  );
};
