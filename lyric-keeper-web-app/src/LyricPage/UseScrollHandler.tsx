import { useState } from "react";

export const UseScrollHandler = () => {
  const [timeoutId, setTimeoutId] = useState(0);
  const [timeoutDuration, setTimeoutDuration] = useState(1000);
  const [isScrolling, setIsScrolling] = useState(false);

  const scroll = () => {
    window.scrollBy(0, 10);
    start();
  };

  const start = () => {
    const id = window.setTimeout(scroll, timeoutDuration);
    setIsScrolling(true);
    setTimeoutId(id);
  };

  const stop = () => {
    window.clearInterval(timeoutId);
    setIsScrolling(false);
  };

  const clearAndRestart = () => {
    if (isScrolling) {
      stop();
      start();
    }
  };

  const increaseTime = () => {
    clearAndRestart();
    setTimeoutDuration(t => t + 500);
  };

  const decreaseTime = () => {
    clearAndRestart();
    setTimeoutDuration(t => t > 500 ? t - 500 : t);
  };

  return {
    start,
    stop,
    increaseTime,
    decreaseTime,
    timeoutDuration,
    isScrolling,
  };
};
