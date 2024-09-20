const express = require("express");
const cors = require("cors");
const axios = require("axios");
const countries = require("../frontend/public/countries.json");
const extraQuestions = require("./extra-questions.json");

const app = express();
app.use(cors());
app.use(express.json());

const NUM_BATCH = 100;

let numQuestions;
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

app.post("/start", async (req, res) => {
  const difficulty = req.body.difficulty;
  numQuestions = req.body.numQuestions;
  const uniqueQuestionsSet = new Set();

  gameQuestions = [];
  score = 0;
  winnings = [];
  finalImage = "";

  try {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=${NUM_BATCH}&category=22&difficulty=${difficulty}&type=multiple`
    );
    const questions = response.data.results;

    const filteredQuestions = questions
      .filter((q) => countries.some((c) => c.country === q.correct_answer))
      .map((q, index) => {
        q.id = index;
        return q;
      });

    const shuffledFilteredQuestions = filteredQuestions.sort(
      () => Math.random() - 0.5
    );

    for (let question of shuffledFilteredQuestions) {
      if (
        gameQuestions.length < numQuestions &&
        !uniqueQuestionsSet.has(question.id)
      ) {
        gameQuestions.push(question);
        uniqueQuestionsSet.add(question.id);
      }
    }

    if (gameQuestions.length < numQuestions) {
      const extraQuestionsSet = new Set(gameQuestions.map((q) => q.id)); // To ensure uniqueness

      while (gameQuestions.length < numQuestions) {
        const randIndex = Math.floor(Math.random() * extraQuestions.length);
        const selected = {
          ...extraQuestions[randIndex],
          id: randIndex + extraQuestions.length,
        };

        if (selected && !extraQuestionsSet.has(selected.id)) {
          gameQuestions.push(selected);
          extraQuestionsSet.add(selected.id);
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
