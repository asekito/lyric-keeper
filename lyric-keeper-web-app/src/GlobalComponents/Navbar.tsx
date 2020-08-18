import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListIcon from "@material-ui/icons/ListAltOutlined";
import QueueMusicIcon from "@material-ui/icons/QueueMusicOutlined";
import { FogGrey, LighterPurple, BrightGreen } from "ColorVars";
import {
  UseCurrentUserReturnShape,
  UseCurrentUser,
  UseResponsiveCheck,
} from "Hooks";
import { StyledMenuItem, StyledMenu, NavMainText } from "./elements";
import { truncate } from "utilities";
import { Link, LoginCreateAccountModal } from "GlobalComponents";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import LibraryIcon from "@material-ui/icons/LibraryMusicOutlined";
import Help from "@material-ui/icons/HelpOutlineOutlined";

export const Navbar: React.FC<Partial<UseCurrentUserReturnShape>> = props => {
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [navMenuAnchorEl, setNavMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

  const currentUserHookData = UseCurrentUser();

  const { isMobile } = UseResponsiveCheck();

  const userMenuOpen = Boolean(userMenuAnchorEl);
  const navMenuOpen = Boolean(navMenuAnchorEl);

  const getCurrentUser = () => {
    if (props.logout && props.setUser) {
      const {
        currentUser,
        currentUserIsLoading,
        isLoggedIn,
        logout,
        setUser,
      } = props;
      return {
        currentUser: currentUser || null,
        currentUserIsLoading: currentUserIsLoading || false,
        isLoggedIn: isLoggedIn || false,
        logout,
        setUser,
      };
    } else {
      return { ...currentUserHookData };
    }
  };

  const {
    currentUserIsLoading,
    setUser,
    isLoggedIn,
    currentUser,
    logout,
  } = getCurrentUser();

  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNavMenuAnchorEl(event.currentTarget);
  };

  const handleNavMenuClose = () => {
    setNavMenuAnchorEl(null);
  };

  const mainTextTopVal = isLoggedIn ? "16px" : "11px";

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
            paddingRight: isMobile ? "4px" : "",
            paddingLeft: isMobile ? "6px" : "",
          }}
        >
          <IconButton
            onClick={handleNavMenu}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ color: "white" }}>
            {!isMobile && (
              <IconButton>
                <HomeIcon style={{ color: "white" }} />
              </IconButton>
            )}
            {isMobile && isLoggedIn && (
              <IconButton>
                <HomeIcon style={{ color: "white" }} />
              </IconButton>
            )}
            <NavMainText
              style={{
                left:
                  isMobile && !isLoggedIn
                    ? "40px"
                    : isMobile && isLoggedIn
                    ? "90px"
                    : "",
                top: isMobile ? mainTextTopVal : "",
              }}
              variant="h6"
            >
              Lyric Keeper
            </NavMainText>
          </Link>
          {/* -------- Left navigational menu -------- */}
          <StyledMenu
            id="menu-appbar"
            anchorEl={navMenuAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={navMenuOpen}
            onClose={handleNavMenuClose}
            style={{ padding: "10px" }}
          >
            <Link to="/">
              <StyledMenuItem
                style={{ color: LighterPurple, textAlign: "center" }}
                onClick={handleUserMenuClose}
              >
                <HomeIcon style={{ marginRight: "10px" }} /> Home
              </StyledMenuItem>
            </Link>
            <Link to="/library">
              <StyledMenuItem
                style={{ color: LighterPurple, textAlign: "center" }}
                onClick={handleUserMenuClose}
              >
                <LibraryIcon style={{ marginRight: "10px" }} /> Library
              </StyledMenuItem>
            </Link>
            <Link to="/help">
              <StyledMenuItem
                style={{ color: LighterPurple, textAlign: "center" }}
                onClick={handleUserMenuClose}
              >
                <Help style={{ marginRight: "10px" }} /> Help
              </StyledMenuItem>
            </Link>
          </StyledMenu>
          {isLoggedIn && currentUser ? (
            <>
              <IconButton
                onClick={handleUserMenu}
                color="inherit"
                size="medium"
                style={{ textAlign: "right", marginLeft: "auto" }}
              >
                <AccountCircle style={{ fontSize: "2.5rem" }} />
              </IconButton>
              <StyledMenu
                id="menu-appbar"
                anchorEl={userMenuAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={userMenuOpen}
                onClose={handleUserMenuClose}
                style={{ padding: "10px" }}
              >
                <Typography>
                  {truncate({ string: currentUser?.email, limit: 20 })}
                </Typography>
                <Link to="/my-lyrics">
                  <StyledMenuItem
                    style={{ color: LighterPurple, textAlign: "center" }}
                    onClick={handleUserMenuClose}
                  >
                    <ListIcon style={{ marginRight: "10px" }} /> My Lyrics
                  </StyledMenuItem>
                </Link>
                <Link to="/my-playlists">
                  <StyledMenuItem
                    style={{ color: LighterPurple, textAlign: "center" }}
                    onClick={handleUserMenuClose}
                  >
                    <QueueMusicIcon style={{ marginRight: "10px" }} />
                    My Playlists
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
