import { useState } from "react";
import quizCompletedImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
export default function Quiz() {
  const [queIndex, setQueIndex] = useState(0);
  function handleQueIndex() {
    setQueIndex((queIndex) => queIndex + 1);
  }
  const isComplete = queIndex >= QUESTIONS.length;

  const quizCompleted = (
    <img
      src={quizCompletedImg}
      alt='quiz is completed'
    />
  );
  return (
    <main id='quiz'>
      <div>
        <h2 id='question-overview'>
          {!isComplete && QUESTIONS[queIndex].text}
          {isComplete && quizCompleted}
        </h2>
      </div>
      <div>
        <ul id='answers'>
          {!isComplete &&
            QUESTIONS[queIndex].answers.map((ans, i) => {
              return (
                <li
                  key={i}
                  className='answer'>
                  <button onClick={handleQueIndex}>{ans}</button>
                </li>
              );
            })}
        </ul>
      </div>
    </main>
  );
}
