import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "../components/Question";
import Feedback from "../components/Feedback";

function Game() {
  const [gameQuestions, setGameQuestions] = useState([]);
  const [curQuestion, setCurQuestion] = useState({});
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [displayQuestion, setDisplayQuestion] = useState(false);
  const [displayFeedback, setDisplayFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleAnswer = async (answer) => {
    const id = curQuestion.id;

    const validateAnswer = async () => {
      try {
        const response = await axios.post("http://localhost:8080/validate", {
          id,
          answer,
        });
        return response.data;
      } catch (error) {
        console.error("Error validating answer:", error);
      }
    };

    const { isCorrect, score } = validateAnswer();
    setScore(score);
    setIsCorrect(isCorrect);
    setDisplayFeedback(true);
    setDisplayQuestion(false);
  };

  const nextQuestion = () => {
    setDisplayFeedback(false);
    setDisplayQuestion(true);
    setQuestionIndex(questionIndex + 1);
    setCurQuestion(gameQuestions[questionIndex]);
    setIsCorrect(false);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:8080/questions");
        setGameQuestions(res.data);
        setCurQuestion(res.data[0]);
        setDisplayQuestion(true);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div class="w-screen h-screen bg-color flex justify-center">
      {displayQuestion && !isLoading && (
        <div class="w-1/2">
          <Question questionData={curQuestion} onAnswer={handleAnswer} />
        </div>
      )}

      {displayFeedback && (
        <Feedback isCorrect={isCorrect} onClose={() => nextQuestion()} />
      )}
    </div>
  );
}

export default Game;
