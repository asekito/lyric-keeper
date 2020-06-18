import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Home from "@material-ui/icons/Home";
import Edit from "@material-ui/icons/Edit";
import Cancel from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import RemoveIcon from "@material-ui/icons/Remove";
import { Link } from "GlobalComponents";
import { SecondaryLightGrey } from "ColorVars";
import { UseResponsiveCheck } from "Hooks";
import { UseScrollHandler } from "./UseScrollHandler";

export const SnackbarButtons: React.FC<any> = ({ edit, setEdit }) => {
  const { isTablet } = UseResponsiveCheck();
  const {
    increaseTime,
    start,
    isScrolling,
    stop,
    decreaseTime,
    timeoutDuration,
  } = UseScrollHandler();

  const buttons = [
    {
      name: "Home",
      icon: () => <Home />,
      link: "/",
    },
    {
      name: "EDIT",
      icon: () => <Edit />,
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

  const InnerWrapper: React.FC<{ to?: string; link?: any }> = ({
    children,
    to = "",
    link,
  }) => <>{link ? <Link to={to}>{children}</Link> : <>{children}</>}</>;

  return (
    <Grid container>
      {buttons.map(
        ({ name, icon, onClick = () => null, display = "flex", ...rest }) => (
          <Grid item xs={12} key={name} onClick={onClick}>
            <InnerWrapper link={rest.link} to={rest.link && rest.link}>
              <ButtonElement
                onClick={onClick}
                style={{ display, marginTop: "15px" }}
              >
                {icon()}
                {!isTablet && name}
                {rest.numberText && rest.numberText}
              </ButtonElement>
            </InnerWrapper>
          </Grid>
        )
      )}
    </Grid>
  );
};
