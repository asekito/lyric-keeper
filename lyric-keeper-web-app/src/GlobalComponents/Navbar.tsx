import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListIcon from "@material-ui/icons/List";
import { FogGrey, LighterPurple, BrightGreen } from "ColorVars";
import { UseCurrentUserReturnShape, UseCurrentUser } from "Hooks";
import { StyledMenuItem, StyledMenu } from "./elements";
import { truncate } from "utilities";
import { Link, LoginCreateAccountModal } from "GlobalComponents";

export const Navbar: React.FC<Partial<UseCurrentUserReturnShape>> = props => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const open = Boolean(anchorEl);

  const getCurrentUser = () => {
    if (
      props.currentUser &&
      props.currentUserIsLoading &&
      props.isLoggedIn &&
      props.logout &&
      props.setUser
    ) {
      const {
        currentUser,
        currentUserIsLoading,
        isLoggedIn,
        logout,
        setUser,
      } = props;
      return { currentUser, currentUserIsLoading, isLoggedIn, logout, setUser };
    } else {
      return { ...UseCurrentUser() };
    }
  };

  const {
    currentUserIsLoading,
    setUser,
    isLoggedIn,
    currentUser,
    logout,
  } = getCurrentUser();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <LoginCreateAccountModal
        currentUserIsLoading={currentUserIsLoading}
        isOpen={loginModalIsOpen}
        setIsOpen={setLoginModalIsOpen}
        setUser={setUser}
      />
      <AppBar position="static">
        <Toolbar
          style={{
            backgroundColor: FogGrey,
          }}
        >
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
          <Link to="/" style={{ color: "white" }}>
            <Typography variant="h6">Lyric Keeper</Typography>
          </Link>
          {isLoggedIn && currentUser ? (
            <>
              <IconButton
                onClick={handleMenu}
                color="inherit"
                size="medium"
                style={{ textAlign: "right", marginLeft: "auto" }}
              >
                <AccountCircle style={{ fontSize: "2.5rem" }} />
              </IconButton>
              <StyledMenu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
                style={{ padding: "10px" }}
              >
                <Typography>
                  {truncate({ string: currentUser?.email, limit: 20 })}
                </Typography>
                <Link to="/my-lyrics">
                  <StyledMenuItem
                    style={{ color: LighterPurple, textAlign: "center" }}
                    onClick={handleClose}
                  >
                    My Lyrics <ListIcon />
                  </StyledMenuItem>
                </Link>
                <StyledMenuItem onClick={logout}>Sign out</StyledMenuItem>
              </StyledMenu>
            </>
          ) : (
            <Button
              style={{
                textAlign: "right",
                marginLeft: "auto",
                color: BrightGreen,
              }}
              onClick={() => setLoginModalIsOpen(true)}
              color="inherit"
            >
              Login or create account
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
