import { useState } from "react";

export const UseScrollHandler = () => {
  const [timeoutId, setTimeoutId] = useState(0);
  const [timeoutDuration, setTimeoutDuration] = useState(1000);
  const [isScrolling, setIsScrolling] = useState(false);

  const scroll = () => {
    window.scrollBy(0, timeoutDuration / 80);
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

  const increaseTime = () => {
    setTimeoutDuration(t => t + 500);
  };

  const decreaseTime = () => {
    setTimeoutDuration(t => t - 500);
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
