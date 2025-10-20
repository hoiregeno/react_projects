import React, { useEffect, useRef, useState } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState(null);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    // Start an interval once
    intervalIdRef.current = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup interval
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  function formatTime() {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const meridiem = hours >= 12 ? "PM" : "AM";

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(
      seconds
    )} ${meridiem}`;
  }

  function padZero(digit) {
    return (digit < 10 ? "0" : "") + digit;
  }

  return <div className="clock">{formatTime()}</div>;
};

export default DigitalClock;
