import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { MainGreen, DarkModePageBackground, PrimaryBlue } from "ColorVars";
import Container from "@material-ui/core/Container";

export const PageHeader = styled(Typography)`
  && {
    color: ${MainGreen};
    font-size: 2.5rem;
    padding-top: 10px;
  }
`;

export const PageWrapper = styled.div<{ isDarkMode: boolean }>`
  height: 100vh;
  width: 100%;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? DarkModePageBackground : "white"};
  text-align: center;
`;

export const MainAreaWrapper = styled(Container)`
  margin: auto;
  padding-bottom: 70px;
  padding-top: 40px;
`;

export const NoLyricsFoundText = styled(Typography)`
  && {
    font-size: 2rem;
    color: ${PrimaryBlue};
  }
`;