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

export const TextFieldStyles = styled.div`
  display: block;
`;

export const HeadingWrapper = styled.div`
  width: 100%;
  min-height: 30px;
  background-color: ${MainGreen};
`;

export const HeadingTitle = styled.div`
  font-weight: 700;
  text-align: left;
  color: white;
  font-size: 27px;
  padding: 14px;
  letter-spacing: 2px;
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
