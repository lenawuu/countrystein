import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "../components/Question";
import Feedback from "../components/Feedback";
import Results from "../components/Results";
import { useNavigate } from "react-router-dom";

function Game() {
  const [gameQuestions, setGameQuestions] = useState([]);
  const [curQuestion, setCurQuestion] = useState({});
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [displayQuestion, setDisplayQuestion] = useState(false);
  const [displayFeedback, setDisplayFeedback] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [countriesData, setCountriesData] = useState([]);

  const navigate = useNavigate();

  const handleAnswer = async (answer) => {
    const id = curQuestion.id;

    const validateAnswer = async () => {
      try {
        const response = await axios.post("http://localhost:8080/validate", {
          id,
          answer,
        });
        setScore(response.data.score);
        setIsCorrect(response.data.isCorrect);
      } catch (error) {
        console.error("Error validating answer:", error);
      }
    };

    validateAnswer();
    setDisplayFeedback(true);
    setDisplayQuestion(false);
  };

  const nextQuestion = () => {
    if (questionIndex < 9) {
      setDisplayFeedback(false);
      setQuestionIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        setCurQuestion(gameQuestions[nextIndex]); // Set curQuestion to the next question
        return nextIndex;
      });
      setIsCorrect(false);
      setDisplayQuestion(true);
    } else {
      setDisplayFeedback(false);
      setShowResults(true);
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:8080/questions");
        setGameQuestions(res.data);
        setCurQuestion(res.data[questionIndex]);
        setDisplayQuestion(true);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();

    fetch("./countries.json")
      .then((response) => response.json())
      .then((json) => setCountriesData(json))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  function generatePath(countryName) {
    const iso = countriesData
      .find((c) => c.country.toLowerCase() === countryName.toLowerCase())
      .iso.toLowerCase();

    const path = `/mapsicon/all/${iso}/vector.svg`;
    return path;
  }

  function handleResultsClose() {
    navigate("/build");
  }

  return (
    <div class="w-screen h-screen bg-color flex flex-col justify-start items-center px-6 py-6">
      <div class="w-full flex justify-center">
        {displayQuestion && (
          <div class="self-start justify-self-center h-fit flex flex-col justify-center">
            <p class="text-center font-bold text-primary">
              Countries collected:
            </p>
            <p class="text-center font-bold text-primary">{score}</p>
          </div>
        )}
      </div>

      {displayQuestion && !isLoading && (
        <div class="w-3/4 h-full flex items-center justify-center">
          <Question questionData={curQuestion} onAnswer={handleAnswer} />
        </div>
      )}

      {displayFeedback && (
        <Feedback
          isCorrect={isCorrect}
          correctAnswer={curQuestion.correct_answer}
          correctSVG={generatePath(curQuestion.correct_answer)}
          onClose={() => nextQuestion()}
        />
      )}

      {showResults && (
        <Results
          score={score}
          onClose={() => {
            handleResultsClose();
          }}
        />
      )}
    </div>
  );
}

export default Game;
