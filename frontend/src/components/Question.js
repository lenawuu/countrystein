import React, { useEffect } from "react";

function Question({ questionData, onAnswer }) {
  const { question, correct_answer, incorrect_answers } = questionData;
  const answers = [...incorrect_answers, correct_answer];

  useEffect(() => {
    console.log(questionData);
  }, [questionData]);

  return (
    <div class="w-full flex flex-col justify-center items-center">
      <div class="border border-primary w-full rounded-md py-4 mb-4">
        <h3 class="text-2xl text-primary font-bold text-center">{question}</h3>
      </div>
      <ul class="flex flex-col items-center w-full">
        {answers.map((a) => (
          <li key={a} class="w-2/3">
            <button class="btn mb-4 w-full" onClick={() => onAnswer(a)}>
              {a}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;
