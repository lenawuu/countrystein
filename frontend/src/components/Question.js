import React, { useEffect } from "react";

function Question({ questionData, onAnswer, questionLabel }) {
  const { question, correct_answer, incorrect_answers } = questionData;
  const answers = [...incorrect_answers, correct_answer];

  useEffect(() => {
    console.log(questionData);
  }, [questionData]);

  return (
    <div class="w-full flex flex-col justify-center items-center">
      <div class="bg-primary rounded-t-md text-md px-4 py-2">
        <p class="font-bold text-md text-accent">{questionLabel}</p>
      </div>
      <div class="border border-primary w-full rounded-md py-10 mb-6">
        <h3 class="text-xl text-primary font-bold text-center">{question}</h3>
      </div>
      <ul class="grid grid-cols-2 grid-rows-2 items-center w-full gap-2 mb-4">
        {answers.map((a) => (
          <li key={a} class="">
            <button
              class="btn btn-lg w-full text-md font-normal"
              onClick={() => onAnswer(a)}
            >
              {a}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;
