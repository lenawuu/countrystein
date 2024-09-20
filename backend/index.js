const express = require("express");
const cors = require("cors");
const axios = require("axios");
const countries = require("../frontend/public/countries.json");
const extraQuestions = require("./extra-questions.json");

const app = express();
app.use(cors());
app.use(express.json());

const BATCH_AMT = 50;
const QUESTION_AMT = 10;
let gameQuestions = [];
let winnings = [];
let score = 0;
let finalImage = "";

function generatePath(countryName) {
  const iso = countries
    .find((c) => c.country.toLowerCase() === countryName.toLowerCase())
    .iso.toLowerCase();

  const path = `/mapsicon/all/${iso}/vector.svg`;
  return path;
}

//TODO: Add num questions
app.post("/start", async (req, res) => {
  const difficulty = req.body.difficulty;
  const numQuestions = req.body.numQuestions;

  gameQuestions = [];
  score = 0;
  winnings = [];
  finalImage = "";

  try {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=${BATCH_AMT}&category=22&difficulty=${difficulty}&type=multiple`
    );
    const questions = response.data.results;

    const filteredQuestions = questions
      .filter((q) => countries.some((c) => c.country === q.correct_answer))
      .map((q, index) => {
        q.id = index;
        return q;
      });

    //FIXME: Select 10 random questions from batch
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

app.post("/validate", async (req, res) => {
  const answer = req.body.answer;
  const questionID = req.body.id;

  const correctAnswer = gameQuestions.filter((q) => q.id === questionID)[0]
    .correct_answer;

  if (answer === correctAnswer) {
    score++;
    winnings.push({
      country: correctAnswer,
      path: generatePath(correctAnswer),
    });
  }

  res.send({ isCorrect: answer === correctAnswer, score });
});

app.get("/questions", (req, res) => {
  res.send(gameQuestions);
});

app.get("/winnings", (req, res) => {
  res.send(winnings);
});

app.post("/final-image", (req, res) => {
  finalImage = req.body.screenshot;

  res.send(`success. image uri: ${finalImage}`);
});

app.get("/final-image", (req, res) => {
  res.send({ image: finalImage });
});

app.listen(8080, () => {
  console.log("Server listening on 8080.");
});
