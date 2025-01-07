import React, { useState, useEffect, useRef, useMemo } from "react";

const Timer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current!);
      timerRef.current = null;
      setHistory((prev) => [...prev, time]);
    } else {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    setIsRunning((prev) => !prev);
    buttonRef.current?.focus();
  };

  const resetTimer = () => {
    clearInterval(timerRef.current!);
    timerRef.current = null;
    setTime(0);
    setIsRunning(false);
  };

  const totalTime = useMemo(() => {
    return (
      history.reduce((acc, curr) => acc + curr, 0) + (isRunning ? time : 0)
    );
  }, [history, time, isRunning]);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current!);
    };
  }, []);

  return (
    <div>
      <h1>Timer</h1>
      <h2>Current time: {time} s</h2>
      <div>
        <button ref={buttonRef} onClick={toggleTimer}>
          {isRunning ? "stop" : "start"}
        </button>
        <button onClick={resetTimer} disabled={isRunning}>
          again{" "}
        </button>
      </div>
      <h3>history</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item} s</li>
        ))}
      </ul>
      <h3>Total Time: {totalTime} s</h3>
    </div>
  );
};

export default Timer;
