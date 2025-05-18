import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// let timer
export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.showModal();
  }
  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }
  function handleStart() {
    // setTimerStarted(true);
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRem) => prevTimeRem - 10);
    }, 10);
  }
  function handleStop() {
    clearInterval(timer.current);
    // setTimerStarted(false); //
    dialog.current.showModal();
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />

      <section className='challenge'>
        <h2>{title}</h2>
        {/* {timerExpired ? <p>'You Lost'</p> : ""} */}
        <p className='challenge-time'>
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : ""}>
          {timerIsActive ? "Time is running" : "Timer Inactive"}
        </p>
      </section>
    </>
  );
}
