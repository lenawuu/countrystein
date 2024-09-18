import React, { useState } from "react";
import axios from "axios";
import { useGameContext } from "../GameContext";
import { Navigate } from "react-router-dom";

function Start() {
  const [difficulty, setDifficulty] = useState("easy");
  const [gameLength, setGameLength] = useState(10);

  const { setGameData } = useGameContext();

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await axios.post("http://localhost:8080/start", {
        difficulty,
        gameLength: Number(gameLength),
      });

      setGameData(() => ({
        questions: data,
      }));

      <Navigate to="/game" replace={true} />;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div class="w-screen h-screen bg-color flex justify-center">
      <div class="w-1/2 content-center">
        <div class="h-2/3 flex flex-col justify-center">
          <h1 class="mb-4">Start a new game</h1>
          <form onSubmit={handleSubmit}>
            <div class="flex flex-col items-center mb-4">
              <h2 class="mb-4 w-full">Select Difficulty</h2>
              <div class="flex flex-row w-2/3 justify-between">
                <input
                  type="radio"
                  name="difficulty"
                  aria-label="Easy"
                  checked={difficulty === "easy"}
                  value="easy"
                  onChange={handleDifficultyChange}
                  class="btn"
                />
                <input
                  type="radio"
                  name="difficulty"
                  aria-label="Normal"
                  checked={difficulty === "normal"}
                  value="normal"
                  onChange={handleDifficultyChange}
                  class="btn"
                />
                <input
                  type="radio"
                  name="difficulty"
                  checked={difficulty === "hard"}
                  value="hard"
                  onChange={handleDifficultyChange}
                  aria-label="Hard"
                  class="btn"
                />
              </div>
              <h2 class="mt-8 mb-4 w-full">Game Length</h2>
              <div class="mb-4 w-full">
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="5"
                  class="range range-primary"
                  value={gameLength}
                  onChange={(e) => setGameLength(e.target.value)}
                />
                <div class="flex justify-between px-2">
                  <p>5</p>
                  <p>10</p>
                  <p>15</p>
                  <p>20</p>
                  <p>25</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn btn-lg btn-primary">
                Start Game
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Start;
