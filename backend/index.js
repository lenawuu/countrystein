const express = require('express')
const cors = require('cors')
const axios = require('axios')
const countries = require('./countries.json')

const app = express()
app.use(cors())
app.use(express.json())

const BATCH_AMT = 50
const QUESTION_AMT = 10
let gameQuestions = []

app.post('/initialize', async (req, res) => {
    const difficulty = req.body.difficulty

    try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=${BATCH_AMT}&category=22&difficulty=${difficulty}&type=multiple`)
        const questions = response.data.results
        
        let i = 0

        while(gameQuestions.length < QUESTION_AMT && i < BATCH_AMT) {
            const answer = questions[i].correct_answer

            if(countries.includes(answer)) {
                gameQuestions.push(questions[i])
            }

            i++
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).send('Error fetching questions');
    }

    // TODO: Handle error in case there is not 10 questions.

    console.log(`LENGTH: ${gameQuestions.length}`)
    res.send(gameQuestions)
})

app.listen(8080, () => {
    console.log('Server listening on 8080.')
})
