import { useEffect, useState } from "react";

export default function ProgressBar({ timer }) {
  const [remTime, setRemTime] = useState(timer);
  useEffect(() => {
    const proBar = setInterval(() => {
      console.log("INterval");

      setRemTime((prevTime) => prevTime - 10);
    }, 10);
    return () => {
      clearInterval(proBar);
    };
  }, []);
  return (
    <progress
      value={remTime}
      max={timer}
    />
  );
}
