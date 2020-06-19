import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { MainGreen, SecondaryGreen } from "ColorVars";
import Button from "@material-ui/core/Button";

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
