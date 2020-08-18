import styled from "styled-components";
import {
  MainGreen,
  PrimaryBlue,
  SecondaryLightGrey,
  SecondaryColor,
  LighterBlue,
  DarkModeSecondaryLightGrey,
} from "ColorVars";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
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
  &&& {
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

export const LoggedOutDescriptiveText = styled.div<{
  darkModeIsEnabled: boolean;
}>`
  align-items: center;
  align-content: baseline;
  justify-content: center;
  display: flex;
  margin-bottom: 10px;
  margin-top: 40px;
  color: ${({ darkModeIsEnabled }) =>
    darkModeIsEnabled ? LighterBlue : PrimaryBlue};
  font-size: 1.8rem;
  letter-spacing: 1px;
  font-family: sans-serif;
  font-weight: bold;
`;

export const LoggedOutInfoSectionWrapper = styled.div<{
  darkModeIsEnabled: boolean;
}>`
  padding: 2rem;
  background-color: ${({ darkModeIsEnabled }) =>
    darkModeIsEnabled ? DarkModeSecondaryLightGrey : SecondaryLightGrey};
  border-radius: 10px;
  margin-top: 40px;
`;

export const DashboardBox = styled.div<{ darkModeIsEnabled: boolean }>`
  background-color: ${({ darkModeIsEnabled }) =>
    darkModeIsEnabled ? DarkModeSecondaryLightGrey : SecondaryLightGrey};
  height: 250px;
  width: 250px;
  border-radius: 25px;
  margin-bottom: 5%;
  cursor: pointer;
  && {
    transition: all 0.2s ease-in-out;
  }
  &&:hover {
    transform: scale(1.1);
  }
`;

export const StyledDashboardBoxLink = styled(Link)<{
  darkModeIsEnabled: boolean;
}>`
  background-color: ${({ darkModeIsEnabled }) =>
    darkModeIsEnabled ? DarkModeSecondaryLightGrey : SecondaryLightGrey};
  height: 250px;
  width: 250px;
  border-radius: 25px;
  margin-bottom: 5%;
  && {
    transition: all 0.2s ease-in-out;
  }
  &&:hover {
    transform: scale(1.1);
  }
`;

export const DashboardBoxText = styled(Typography)`
  && {
    font-size: 2rem;
    text-align: center;
    margin: auto;
    color: ${SecondaryColor};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
