import React, { useState, useEffect } from "react";

interface ReturnObj {
  isOffline: boolean;
  isOnline: boolean;
}

export const UseIsOffline = () => {
  const [isOffline, setIsOffline] = useState(true);

  const onLineStatus = window.navigator.onLine;

  useEffect(() => {
    setIsOffline(!onLineStatus);
  }, [onLineStatus]);

  const returnObj: ReturnObj = { isOffline, isOnline: !isOffline };

  return returnObj;
};
