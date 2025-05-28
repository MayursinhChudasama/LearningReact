import { useEffect, useState } from "react";
const totalTime = Number(10000);
export default function Progress({ onTimeout }) {
  const [timer, setTimer] = useState(totalTime);
  useEffect(() => {
    console.log("SETTING TIMEOUT");
    const timeOut = setTimeout(onTimeout, totalTime);
    return () => {
      clearTimeout(timeOut);
    };
  }, [totalTime, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("interval");
      setTimer((preTimer) => preTimer - 100);
      //   console.log(timer);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      id='question-time'
      value={timer}
      max={totalTime}></progress>
  );
}
