import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { LoadingScreenWrapper, StyledCircularProgress } from "./elements";
import { MainGreen } from "ColorVars";

export const LoadingIndicator: React.FC<{ style?: any }> = ({ style }) => (
  <div style={{ textAlign: "center" }}>
    <CircularProgress style={{ display: "none" }} />
    <StyledCircularProgress style={{ color: MainGreen, ...style }} />
  </div>
);

export const LoadingScreen: React.FC<{ darkMode: boolean }> = props => (
  <>
    <LoadingIndicator style={{ position: "absolute", color: MainGreen }} />
    <LoadingScreenWrapper {...props} />
  </>
);
