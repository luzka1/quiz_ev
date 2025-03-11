import { useContext } from "react";
import { GameConfigContext } from "@/context/config";

export const useGameConfigContext = () => useContext(GameConfigContext);
