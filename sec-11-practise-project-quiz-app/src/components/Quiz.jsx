import { useState, useCallback } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import Progress from "./Progress.jsx";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  console.log(userAnswers);
  const isComplete = activeQuestionIndex === QUESTIONS.length;

  if (isComplete) {
    return (
      <div id='summary'>
        <img
          src={quizCompleteImg}
          alt='Trophy icon'
        />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  return (
    <main id='quiz'>
      <div id='question'>
        <Progress
          key={activeQuestionIndex}
          onTimeout={handleSkipAnswer}
        />
        <h2 id='question-overview'>{QUESTIONS[activeQuestionIndex].text}</h2>
      </div>
      <div>
        <ul id='answers'>
          {shuffledAnswers.map((ans, i) => {
            return (
              <li
                key={i}
                className='answer'>
                <button onClick={() => handleSelectAnswer(ans)}>{ans}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
