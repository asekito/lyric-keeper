import styled from "styled-components";
import { DarkModePageBackground } from "ColorVars";
import CircularProgress from "@material-ui/core/CircularProgress";

export const StyledCircularProgress = styled(CircularProgress)`
  margin-right: auto;
  margin-top: 20%;
  margin-left: -10px;
  &&& {
    .MuiCircularProgress-colorPrimary {
      color: green;
    }
  }
`;

export const LoadingScreenWrapper = styled.div<{ darkMode: boolean }>`
  height: 100vh;
  width: 100%;
  background-color: ${({ darkMode }) =>
    darkMode ? DarkModePageBackground : "white"};
`;
