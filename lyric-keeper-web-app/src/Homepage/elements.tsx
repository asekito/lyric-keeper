import styled from "styled-components";
import { MainGreen, PrimaryBlue } from "ColorVars";
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
  && {
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
