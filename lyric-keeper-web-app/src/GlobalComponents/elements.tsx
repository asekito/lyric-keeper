import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  MainGreen,
  SecondaryGreen,
  SecondaryColor,
  PrimaryBlue,
  LighterPurple,
  SecondaryLightGrey,
  DarkModeLighterPurple,
} from "ColorVars";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import { DarkModePageBackground } from "ColorVars";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Skeleton from "@material-ui/lab/Skeleton";
import DialogTitle from "@material-ui/core/DialogTitle";

export const StyledContainer = styled(Container)`
  background-color: white;
  min-height: 315px;
  padding: 15px;
  margin-top: 20px;
  padding-top: 13px;
  text-align: center;
`;

export const LoginHeader = styled(Typography)`
  color: ${MainGreen};
  font-size: 1.7rem;
  text-align: center;
`;

export const StyledTextField = styled(TextField)`
  display: block;
  width: 320px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 30px;
  && {
    .MuiInput-root.MuiInputBase-root {
      width: inherit;
    }
  }
`;

export const Error = styled(Typography)`
  color: red;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  margin-top: 10px;
`;

export const StyledButton = styled(Button)`
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
`;

export const ModalStyleSwitcher = styled(Typography)`
  width: fit-content;
  margin: auto;
  font-size: 1rem;
  color: ${SecondaryGreen};
  margin-top: 30px;
  cursor: pointer;
`;

export const MarketingWrapper = styled.div`
  background-color: #79cb798c;
  min-height: 288px;
`;

export const MainMarketingHeader = styled(Typography)`
  & {
    font-size: 1.5rem;
    color: black;
    letter-spacing: 2px;
    font-weight: 100;
  }
`;

export const StyledFab = styled(Fab)`
  right: -52%;
  top: -21px;
  & {
    width: 35px;
    height: 35px;
  }
`;

export const SecondaryMarketingText = styled(Typography)`
  & {
    font-size: 1.2rem;
    color: ${SecondaryColor};
    letter-spacing: 3px;
    margin-top: 35px;
  }
`;

export const MarketingText = styled(Typography)`
  & {
    font-size: 0.9rem;
    letter-spacing: 2px;
    margin-top: 35px;
    color: ${LighterPurple};
  }
`;

export const LoginOrCreateAccountButton = styled(Button)`
  & {
    color: ${PrimaryBlue};
    margin-right: auto;
    margin-left: auto;
    margin-top: 15px;
    margin-bottom: 30px;
  }
`;

export const MbarWrapper = styled.div`
  background-color: ${SecondaryLightGrey};
  width: auto;
  height: fit-content;
  padding: 10px;
  text-align: center;
`;

export const MbarText = styled.div`
  color: ${SecondaryGreen};
  font-size: 1.3rem;
  letter-spacing: 3px;
  display: inline;
`;

export const MbarButton = styled(Button)`
  & {
    font-size: 0.9rem;
    margin-left: 10px;
    color: ${SecondaryGreen};
    display: inline;
  }
`;

export const StyledCircularProgress = styled(CircularProgress)`
  margin-right: auto;
  margin-top: 20%;
  margin-left: -10px;
`;

export const LoadingScreenWrapper = styled.div<{ darkMode: boolean }>`
  height: 100vh;
  width: 100%;
  background-color: ${({ darkMode }) =>
    darkMode ? DarkModePageBackground : "white"};
`;

export const StyledMenuItem = styled(MenuItem)`
  &&& {
    text-align: center;
  }
`;

export const StyledMenu = styled(Menu)`
  && {
    .MuiMenu-paper {
      padding: 10px;
      padding-top: 5px;
    }
  }
`;

export const StyledImg = styled.img<{ isHidden: boolean }>`
  ${({ isHidden }) => isHidden && "display: hidden;"}
`;

export const StyledPlaceholder = styled(Skeleton)<{
  darkMode: boolean;
  topSpacing?: boolean;
}>`
  && {
    text-align: center;
    font-size: 2rem;
    position: absolute;
    color: ${MainGreen};
    font-family: sans-serif;
    background-color: ${({ darkMode }) =>
      darkMode ? DarkModePageBackground : "white"};
    margin: auto;
    top: ${({ topSpacing }) => (topSpacing ? "-4%" : "-24%")};
    bottom: 0;
    right: 0;
    left: 0;
    height: fit-content;
    width: 330px;
    white-space: pre-line;
  }
`;

export const LyricCountWrapper = styled.div<{ darkMode: boolean }>`
  font-size: 1rem;
  text-align: left;
  letter-spacing: 2px;
  color: ${({ darkMode }) =>
    darkMode ? DarkModeLighterPurple : LighterPurple};
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

export const ModalContentWrapper = styled.div<{ darkMode: boolean }>`
  text-align: center;
  background-color: ${({ darkMode }) =>
    darkMode ? DarkModePageBackground : "white"};
  min-width: 65%;
  height: 60vh;
  position: absolute;
  margin: auto;
  border-radius: 6px;
  top: 16%;
  left: 20%;
  overflow: scroll;
`;

export const NavMainText = styled(Typography)`
  display: inline;
  position: absolute;
  left: 70px;
  top: 18px;
`;
