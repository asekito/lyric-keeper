import styled from "styled-components";
import {
  PrimaryBlue,
  MainGreen,
  DarkModeSecondaryLightGrey,
  SecondaryLightGrey,
  SecondaryColor,
  SemiLightGreen,
  LighterBlue,
} from "ColorVars";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Modal from "@material-ui/core/Modal";

export const NoPlaylistsText = styled(Typography)`
  && {
    padding-top: 30px;
    font-size: 2rem;
    color: ${PrimaryBlue};
  }
`;

export const NewPlaylistButton = styled(Button)`
  && {
    margin-top: 30px;
  }
`;

export const NewLyricControlButton = styled(Button)`
  && {
    display: inline-flex;
    margin: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

export const CardWrapper = styled.div<{
  darkMode: boolean;
  isSelected: boolean;
  draggable: boolean;
}>`
  min-height: 40px;
  margin: auto;
  padding: 10px;
  margin-top: 15px;
  border-radius: 6px;
  div {
    text-decoration: none !important;
  }
  cursor: ${({ draggable }) => (draggable ? "grab" : "pointer")};
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

export const NewPlaylistDescriptiveText = styled(Typography)`
  && {
    font-size: 1.3rem;
    color: ${LighterBlue};
    margin-top: 30px;
  }
`;

export const ErrorText = styled(Typography)`
  && {
    color: red;
    font-size: 1.4rem;
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const PlaylistCardWrapper = styled.div<{ darkMode: boolean }>`
  min-height: 40px;
  margin: auto;
  padding: 8px;
  margin-top: 15px;
  border-radius: 6px;
  div {
    text-decoration: none !important;
  }
  cursor: pointer;
  background-color: ${({ darkMode }) =>
    darkMode ? DarkModeSecondaryLightGrey : SecondaryLightGrey};
`;

export const PlaylistCardCounter = styled(Typography)`
  && {
    font-size: 4rem;
    color: ${SecondaryColor};
    display: inline;
    text-align: right;
    vertical-align: middle;
  }
`;

export const PlaylistCardTitle = styled(Typography)`
  && {
    font-size: 1.5rem;
    color: ${MainGreen};
    vertical-align: super;
    margin-right: 40px;
    text-align: left;
  }
`;

export const PlaylistCardDescriptiveText = styled(Typography)`
  && {
    font-size: 1.2rem;
    margin-top: 15px;
    text-align: left;
    margin-left: auto;
    color: ${PrimaryBlue};
  }
`;

export const SmallPlaylistCardText = styled(Typography)`
  && {
    font-size: 1rem;
    color: ${PrimaryBlue};
    display: inline;
    margin-left: 5px;
    text-align: left;
  }
`;

export const StyledModal = styled(Modal)`
  && {
    .sc-fzoiQi {
      width: 90%;
      left: 5%;
      top: 5%;
      height: 84vh;
    }
  }
`;
