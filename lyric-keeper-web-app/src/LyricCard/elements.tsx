import styled from "styled-components";
import {
  PrimaryBlue,
  SecondaryColor,
  MainGreen,
  SecondaryLightGrey,
  DarkModeSecondaryLightGrey,
} from "ColorVars";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

export const StyledDialogTitle = styled(DialogTitle)`
  color: ${MainGreen};
`;

export const DialogLyricTitle = styled(Typography)`
  display: inline;
  font-weight: 500;
  font-size: inherit;
  color: ${SecondaryColor};
`;

export const DialogButton = styled(Button)`
  && {
    display: inline;
    margin: 10px;
    margin-bottom: 20px; /* DO NOT REMOVE! IT IS NOT USELESS! VSCODE IS LYING!! */
    border-color: red;
    border-width: 1.5px;
  }
`;
