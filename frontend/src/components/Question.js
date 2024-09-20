import React, { useEffect } from "react";

function Question({ questionData, onAnswer }) {
  const { question, correct_answer, incorrect_answers } = questionData;
  const answers = [...incorrect_answers, correct_answer];

  useEffect(() => {
    console.log(questionData);
  }, [questionData]);

  return (
    <div class="w-full flex flex-col justify-center items-center">
      <h3 class="mb-4 text-2xl text-primary font-bold text-center">
        {question}
      </h3>
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
