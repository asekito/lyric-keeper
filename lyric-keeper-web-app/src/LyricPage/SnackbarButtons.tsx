import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Edit from "@material-ui/icons/Edit";
import Cancel from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import RemoveIcon from "@material-ui/icons/Remove";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { SecondaryLightGrey } from "ColorVars";
import { UseResponsiveCheck, UseCurrentUser } from "Hooks";
import { UseScrollHandler } from "./UseScrollHandler";
import { useHistory } from "react-router-dom";

interface Props {
  edit: boolean;
  setEdit: React.Dispatch<boolean>;
  lyricId: string;
}

export const SnackbarButtons: React.FC<Props> = ({
  edit,
  setEdit,
  lyricId,
}) => {
  const { isLoggedIn, currentUser } = UseCurrentUser();
  const { isTablet } = UseResponsiveCheck();
  const {
    increaseTime,
    start,
    isScrolling,
    stop,
    decreaseTime,
    timeoutDuration,
  } = UseScrollHandler();
  const history = useHistory();

  const isLyricCreator = !!currentUser?.lyrics?.find(
    id => id?.lyricId === lyricId
  );

  const buttons = [
    {
      name: "Back",
      icon: () => <ArrowBackIosIcon />,
      onClick: () => {
        stop();
        history.goBack();
      },
    },
    {
      name: "EDIT",
      icon: () => <Edit />,
      display: isLoggedIn && isLyricCreator ? "flex" : "none",
      onClick: () => setEdit(true),
    },
    {
      name: "CANCEL",
      icon: () => <Cancel />,
      display: edit ? "flex" : "none",
      onClick: () => setEdit(false),
    },
    {
      name: "Increase time",
      icon: () => <AddIcon />,
      display: edit ? "none" : "flex",
      onClick: () => increaseTime(),
    },
    {
      name: isScrolling ? "Stop" : "Start",
      icon: () => (isScrolling ? <PauseIcon /> : <PlayArrowIcon />),
      display: edit ? "none" : "flex",
      numberText: ` - ${timeoutDuration}`,
      onClick: () => (isScrolling ? stop() : start()),
    },
    {
      name: "Decrease time",
      icon: () => <RemoveIcon />,
      display: edit ? "none" : "flex",
      onClick: () => decreaseTime(),
    },
  ];

  const ButtonElement: React.FC<{
    style: React.CSSProperties;
    onClick(): void;
  }> = ({ children, style }: any) =>
      isTablet ? (
        <IconButton
          edge="end"
          style={{
            ...style,
            backgroundColor: SecondaryLightGrey,
          }}
        >
          {children}
        </IconButton>
      ) : (
          <Button style={{ ...style }} size="large" variant="contained">
            {children}
          </Button>
        );

  return (
    <Grid container>
      {buttons.map(
        ({ name, icon, onClick = () => null, display = "flex", ...rest }) => (
          <Grid item xs={12} key={name} onClick={onClick}>
            <ButtonElement
              onClick={onClick}
              style={{ display, marginTop: "15px" }}
            >
              {icon()}
              {!isTablet && name}
              {rest?.numberText}
            </ButtonElement>
          </Grid>
        )
      )}
    </Grid>
  );
};
