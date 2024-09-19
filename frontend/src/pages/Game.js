import React, { useEffect, useState } from "react";
import axios from "axios";

function Game() {
  const [gameQuestions, setGameQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:8080/questions");
        setGameQuestions(res.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div class="w-screen h-screen bg-color flex justify-center">
      {gameQuestions.length}
    </div>
  );
}

export default Game;
