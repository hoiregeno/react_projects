import React, { useEffect, useRef, useState } from "react";
import "../styles/Stopwatch.css";

function Stopwatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  // useEffect to handle the interval for the stopwatch
  useEffect(() => {
    // Only start the interval if the stopwatch is running
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        // Update elapsedTime by comparing current time with startTime
        setElapsedTime(new Date() - startTimeRef.current);
      }, 10);
    }

    // Cleanup function: stops the interval when isRunning changes or component unmounts
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]); // Runs whenever isRunning changes

  function start() {
    if (!isRunning) {
      // Calculate the start time based on elapsedTime to support pause/resume
      startTimeRef.current = new Date() - elapsedTime;
      setIsRunning(true); // kick off the interval
    }
  }

  function stop() {
    if (isRunning) {
      setIsRunning(false); // stopping the interval happens via cleanup in useEffect
    }
  }

  function reset() {
    setIsRunning(false); // stop the timer
    setElapsedTime(0); // reset the elapsed time
  }

  function formatTime() {
    // Define multiples for easier understanding
    const MS_IN_SECOND = 1000;
    const MS_IN_MINUTE = 60 * MS_IN_SECOND;
    const MS_IN_HOUR = 60 * MS_IN_MINUTE;

    // Calculate each unit using multiples
    const hours = Math.floor(elapsedTime / MS_IN_HOUR);
    const minutes = Math.floor((elapsedTime / MS_IN_MINUTE) % 60);
    const seconds = Math.floor((elapsedTime / MS_IN_SECOND) % 60);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10); // two-digit ms

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}:${padZero(
      milliseconds
    )}`;
  }

  function padZero(number) {
    return (number < 10 ? "0" : "") + number;
  }

  return (
    <div className="container">
      <h1 className="stopwatch">{formatTime()}</h1>
      <div className="btn-container">
        <button onClick={start} id="start-btn">
          Start
        </button>
        <button onClick={stop} id="stop-btn">
          Stop
        </button>
        <button onClick={reset} id="reset-btn">
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
