import styled from "styled-components";
import { DarkModePageBackground } from "ColorVars";

export const PageWrapper = styled.div<{ isDarkMode: boolean }>`
  height: 100%;
  width: 100%;
  min-height: 94vh;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? DarkModePageBackground : "white"};
  text-align: center;
  padding-bottom: 50px;
`;
