import styled from "styled-components";
import {
  MainGreen,
  LighterPurple,
  DarkModeLighterPurple,
  PrimaryBlue,
} from "ColorVars";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { Link } from "GlobalComponents";

export const WelcomeText = styled(Typography)<{ darkMode: boolean }>`
  font-size: 2rem;
  letter-spacing: 7px;
  color: ${MainGreen};
  border: ${({ darkMode }) => (darkMode ? `white` : `#0000001c`)} solid 1px;
  border-radius: 6px;
  width: fit-content;
  margin: auto;
  padding: 2px;
  padding-left: 7px;
  margin-bottom: 30px;
  margin-top: 20px;
`;

export const DefaultPageWrapper = styled.div<{ darkMode: boolean }>`
  text-align: center;
  background-color: ${({ darkMode }) => (darkMode ? `#1a1a1a` : `white`)};
  padding-top: 30px;
  min-height: 88vh;
`;

export const MainAreaWrapper = styled(Container)`
  margin: auto;
  padding-bottom: 70px;
`;

export const StyledSelect = styled(Select)<{ darkMode: boolean }>`
  width: 4.5rem;
  display: inline-block;
  margin-top: 16px;
  left: 13px;
  color: ${({ darkMode }) => (darkMode ? `white` : `black`)};
  & {
    .MuiSelect-icon {
      color: ${({ darkMode }) => (darkMode ? `white` : `black`)};
    }
  }
`;

export const StyledSwitch = styled(Switch)`
  && {
    .MuiSwitch-colorSecondary.Mui-checked {
      color: ${MainGreen};
    }
    .MuiSwitch-track {
      background-color: grey;
    }
  }
`;

export const StyledTextField = styled(TextField)<{ darkMode: boolean }>`
  & {
    .MuiInputBase-input {
      color: ${({ darkMode }) => (darkMode ? `white` : `black`)};
    }
    .MuiInputLabel-root {
      color: ${({ darkMode }) => (darkMode ? `white` : `black`)};
    }
  }
`;

export const StyledIconButton = styled(IconButton)<{ darkMode: boolean }>`
  color: ${({ darkMode }) => (darkMode ? `white` : `black`)};
`;

export const LightIcon = styled(WbSunnyIcon)`
  && {
    color: black;
    height: 50px;
    display: inline-block;
    margin-bottom: -20px;
    font-size: 40px;
  }
`;

export const DarkIcon = styled(NightsStayIcon)`
  && {
    color: white;
    height: 50px;
    display: inline-block;
    margin-bottom: -20px;
    font-size: 40px;
  }
`;

export const NoLyricsToDisplayText = styled.div<{ darkMode: boolean }>`
  margin-top: 5vh;
  font-size: 3vh;
  display: block;
  letter-spacing: 0.2vw;
  color: ${({ darkMode }) => (darkMode ? "white" : "black")};
`;

export const StyledLink = styled(Link)`
  align-items: center;
  align-content: baseline;
  justify-content: center;
  display: flex;
  margin-bottom: 10px;
  color: ${PrimaryBlue};
  font-size: 1.2rem;
  letter-spacing: 1px;
  font-family: sans-serif;
  font-weight: bold;
`;
