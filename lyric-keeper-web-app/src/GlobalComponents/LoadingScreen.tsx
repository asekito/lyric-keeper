import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  LoadingScreenWrapper,
  StyledCircularProgress,
  StyledPlaceholder,
} from "./elements";
import { MainGreen } from "ColorVars";

const phrases = [
  "Thanks for using Lyric Keeper!",
  "Will you be using Lyric Keeper while you're offline?\n\n Check out our FAQ page for more info on how to install our app.",
  `“If you have to ask what jazz is, you’ll never know.” \n– Louis Armstrong`,
  `“Do it again on the next verse and people think you meant it.” \n– Chet Atkins`,
];

export const LoadingIndicator: React.FC<{ style?: any }> = ({ style }) => (
  <div style={{ textAlign: "center" }}>
    {/* Temporary fix for strange loading bug */}
    <CircularProgress style={{ display: "none" }} />
    <StyledCircularProgress style={{ color: MainGreen, ...style }} />
  </div>
);

export const LoadingScreen: React.FC<{
  darkMode: boolean;
  topSpacing?: boolean;
}> = props => {
  const [timeoutId, setTimeoutId] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(
    phrases[Math.floor(Math.random() * (phrases.length - 0) + 0)]
  );

  const getNewPhrase = () => {
    setCurrentPhrase(
      phrases[Math.floor(Math.random() * (phrases.length - 0) + 0)]
    );
  };

  const startTimer = () => {
    timeoutId !== 0 && window.clearTimeout(timeoutId);
    const id = window.setTimeout(getNewPhrase, 5000);
    setTimeoutId(id);
  };

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPhrase]);

  return (
    <>
      {/* Temporary fix for strange loading bug */}
      <LoadingIndicator
        style={{ position: "absolute", color: MainGreen, display: "none" }}
      />
      <StyledPlaceholder animation="pulse" {...props}>
        {currentPhrase}
      </StyledPlaceholder>
      <LoadingScreenWrapper {...props} />
    </>
  );
};
