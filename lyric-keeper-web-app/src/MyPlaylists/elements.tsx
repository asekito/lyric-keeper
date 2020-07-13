import styled from "styled-components";
import {
  PrimaryBlue,
  MainGreen,
  DarkModeSecondaryLightGrey,
  SecondaryLightGrey,
  SecondaryColor,
  SemiLightGreen,
} from "ColorVars";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

export const NoPlaylistsText = styled(Typography)`
  && {
    margin-top: 30px;
    font-size: 2rem;
    color: ${PrimaryBlue};
  }
`;

export const NewPlaylistButton = styled(Button)`
  && {
    margin-top: 30px;
  }
`;

export const CardWrapper = styled.div<{
  darkMode: boolean;
  isSelected: boolean;
}>`
  min-height: 40px;
  margin: auto;
  padding: 8px;
  margin-top: 15px;
  border-radius: 6px;
  div {
    text-decoration: none !important;
  }
  cursor: pointer;
  ${({ isSelected }) =>
    isSelected ? `border: solid ${SemiLightGreen} 10px;` : "border: none;"}
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

export const MainAreaWrapper = styled(Container)`
  margin: auto;
  padding-bottom: 70px;
`;
