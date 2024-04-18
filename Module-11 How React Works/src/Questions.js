import React, { useState } from "react";

function Questions() {
  const questions = ["How are you?", "Why?"];
  const [i, seti] = useState(0);
  console.log(i);
  return (
    <div>
      hi
      <QuestionBox question={questions[i]}  />
      <button
        onClick={() => {
          seti((i) => {
            if (i === 1) {
              return 0;
            }
            return 1;
          });
        }}
      >
        Toggle question
      </button>
    </div>
  );
}

function QuestionBox({ question }) {
    // bina key ke ye states preserved rahengi change nahi hongi.
  const [q, setq] = useState(question);
  console.log(q);
}
export default Questions;
