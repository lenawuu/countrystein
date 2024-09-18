import React, { createContext, useState, useContext } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameData, setGameData] = useState({
    questions: [],
  });

  return (
    <GameContext.Provider value={{ gameData, setGameData }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
