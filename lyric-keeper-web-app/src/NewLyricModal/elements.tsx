import styled from "styled-components";
import {
  MainGreen,
  DarkModePageBackground,
  SecondaryGreen,
  LighterPurple,
} from "ColorVars";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Modal from "@material-ui/core/Modal";
import Fab from "@material-ui/core/Fab";

export const TextFieldStyles = styled.div`
  display: block;
`;

export const HeadingWrapper = styled.div`
  width: 100%;
  min-height: 30px;
  background-color: ${MainGreen};
`;

export const HeadingTitle = styled(Typography)`
  text-align: center;
  color: white;
  font-size: 28px;
  padding: 2px;
  letter-spacing: 3px;
`;

export const StyledModal = styled(Modal)`
  && {
    .sc-fznzOf {
      height: 100vh;
    }
  }
`;

export const StyledFab = styled(Fab)`
  height: 40px;
  width: 42px;
  right: 0.12vw;
  top: 2px;
  position: absolute;
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

export const SwitchHelpText = styled(Typography)<{ darkMode: boolean }>`
  && {
    font-size: 1rem;
    color: ${LighterPurple};
    margin-top: 10px;
    white-space: pre-wrap;
  }
`;

export const StyledSwitch = styled(Switch)`
  && {
    .MuiSwitch-colorSecondary {
      color: grey;
    }
    .MuiSwitch-colorSecondary.Mui-checked {
      color: ${SecondaryGreen};
    }

    .MuiSwitch-track {
      background-color: grey;
    }
  }
`;

export const SwitchLabel = styled(Typography)<{ darkMode: boolean }>`
  && {
    font-size: 1rem;
    display: inline;
    color: ${({ darkMode }) => (darkMode ? `white` : `black`)};
  }
`;
