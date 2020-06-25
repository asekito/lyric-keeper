import styled from "styled-components";
import {
  PrimaryBlue,
  SecondaryColor,
  MainGreen,
  SecondaryLightGrey,
  DarkModeSecondaryLightGrey,
} from "ColorVars";

export const CardWrapper = styled.div<{ darkMode: boolean }>`
  min-height: 40px;
  margin: auto;
  padding: 8px;
  margin-top: 15px;
  border-radius: 6px;
  div {
    text-decoration: none !important;
  }
  background-color: ${({ darkMode }) =>
    darkMode ? DarkModeSecondaryLightGrey : SecondaryLightGrey};
`;

export const CardTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  vertical-align: super;
  color: ${MainGreen};
  display: inline;
`;

export const CardAuthor = styled.div`
  font-size: 1.6rem;
  vertical-align: super;
  font-weight: 700;
  color: ${PrimaryBlue};
  display: inline;
`;

export const TitleAuthorDivider = styled.div`
  font-size: 1.6rem;
  font-weight: 900;
  vertical-align: super;
  color: ${SecondaryColor};
  display: inline;
  margin: auto 20px;
`;
