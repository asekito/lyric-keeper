import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
  MainGreen,
  SecondaryGreen,
  SecondaryColor,
  PrimaryBlue,
  LighterPurple,
  SecondaryLightGrey,
} from "ColorVars";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";

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
