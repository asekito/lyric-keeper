import styled from "styled-components";
import {
  MainGreen,
  PrimaryBlue,
  SecondaryColor,
  DarkModePageBackground,
  DarkModeSecondaryLighterPurple,
} from "ColorVars";

export const PageWrapper = styled.div<{ darkMode: boolean }>`
  text-align: center;
  margin: auto;
  white-space: pre;
  padding-bottom: 60px;
  background-color: ${({ darkMode }) =>
    darkMode ? DarkModePageBackground : "white"};
  padding-top: 40px;
`;

export const Songtitle = styled.div`
  font-size: 4.5vh;
  font-weight: 500;
  color: ${MainGreen};
`;

export const SongAuthor = styled.div`
  font-size: 3.5vh;
  font-weight: 500;
  margin-bottom: 50px;
  color: ${PrimaryBlue};
`;

export const SongChorus = styled.div<{ darkMode: boolean }>`
  text-align: center !important;
  margin: 20px auto;
  font-size: 2.2vh;
  letter-spacing: 0.1vw;
  color: ${({ darkMode }) =>
    darkMode ? DarkModeSecondaryLighterPurple : SecondaryColor};
  white-space: pre-wrap;
`;

export const SongVerse = styled.div<{ darkMode: boolean }>`
  text-align: center;
  margin: auto 4vw auto;
  margin-top: 5px;
  font-size: 2.1vh;
  letter-spacing: 0.1vw;
  white-space: pre-wrap;
  color: ${({ darkMode }) => (darkMode ? "white" : "black")};
`;

export const StyledErrorMessage = styled.h1`
  color: red;
  text-align: center;
  margin-top: 20%;
`;
