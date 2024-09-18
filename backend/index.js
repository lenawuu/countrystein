const express = require("express");
const cors = require("cors");
const axios = require("axios");
const countries = require("./countries.json");
const extraQuestions = require("./extra-questions.json");

const app = express();
app.use(cors());
app.use(express.json());

const BATCH_AMT = 50;
const QUESTION_AMT = 10;
let gameQuestions = [];
let score = 0;

app.post("/start", async (req, res) => {
  const difficulty = req.body.difficulty;
  const numQuestions = req.body.numQuestions;

  try {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=${BATCH_AMT}&category=22&difficulty=${difficulty}&type=multiple`
    );
    const questions = response.data.results;

    const filteredQuestions = questions
      .filter((q) => countries.includes(q.correct_answer))
      .map((q, index) => {
        q.id = index;
        return q;
      });

    gameQuestions.push(...filteredQuestions.slice(0, QUESTION_AMT));

    // If there are less than 10 questions after requesting API
    while (gameQuestions.length < QUESTION_AMT) {
      if (gameQuestions.length < QUESTION_AMT) {
        const randIndex = Math.floor(Math.random() * extraQuestions.length);
        const selected = extraQuestions[randIndex];

        if (
          !gameQuestions.some((q) => q.id === randIndex + BATCH_AMT) &&
          selected
        ) {
          selected.id = randIndex + BATCH_AMT;
          gameQuestions.push(selected);
        }
      }
    }

    console.log(`LENGTH: ${gameQuestions.length}`);
    res.send(gameQuestions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("Error fetching questions");
  }
});

app.post("/validate", (req, res) => {
  const answer = req.body.answer;
  const questionID = req.body.questionID;

  const isCorrect =
    answer ===
    gameQuestions.filter((q) => q.id === questionID)[0].correct_answer;

  if (isCorrect) {
    score++;
  }

  res.send({ correct: isCorrect, score });
});

app.listen(8080, () => {
  console.log("Server listening on 8080.");
});
