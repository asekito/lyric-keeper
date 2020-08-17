import React, { useEffect, useState } from "react";
import { WelcomeText, StyledSwitch, DarkIcon, LightIcon } from "./elements";
import {
  LoginCreateAccountModal,
  MarketingModal,
  MarketingBar,
  Navbar,
  DefaultPageWrapper,
} from "GlobalComponents";
import { UseCurrentUser, UseDarkMode } from "Hooks";
import { LoggedInView } from "./LoggedInView";
import { LoggedOutView } from "./LoggedOutView";

export const Homepage: React.FC = () => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [marketingModalIsOpen, setMarketingModalIsOpen] = useState(true);

  const currentUserDetails = UseCurrentUser();

  const { isLoggedIn, setUser, currentUserIsLoading } = currentUserDetails;

  const { darkModeIsEnabled, setDarkMode } = UseDarkMode();

  useEffect(() => {
    if (
      isLoggedIn ||
      window.localStorage.getItem("showMarketing") === "false"
    ) {
      setLoginModalIsOpen(false);
      setMarketingModalIsOpen(false);
    } else {
      setMarketingModalIsOpen(true);
    }
  }, [isLoggedIn]);

  const handleMarketingLoginButtonClick = () => {
    setMarketingModalIsOpen(false);
    setLoginModalIsOpen(true);
  };

  return (
    <>
      {!isLoggedIn && (
        <MarketingBar onLoginButtonClick={() => setLoginModalIsOpen(true)} />
      )}
      <Navbar {...currentUserDetails} />
      <DefaultPageWrapper darkMode={darkModeIsEnabled}>
        <LoginCreateAccountModal
          currentUserIsLoading={currentUserIsLoading}
          isOpen={loginModalIsOpen}
          setIsOpen={setLoginModalIsOpen}
          setUser={setUser}
        />
        <MarketingModal
          handleLoginButtonClick={handleMarketingLoginButtonClick}
          isOpen={marketingModalIsOpen}
          setIsOpen={setMarketingModalIsOpen}
        />
        <WelcomeText darkMode={darkModeIsEnabled} variant="h3">
          Lyric Keeper
        </WelcomeText>
        {darkModeIsEnabled ? <DarkIcon /> : <LightIcon />}
        <StyledSwitch
          checked={darkModeIsEnabled}
          onChange={({ target: { checked } }) => setDarkMode(checked)}
        />
        {isLoggedIn ? <LoggedInView /> : <LoggedOutView />}
      </DefaultPageWrapper>
    </>
  );
};
