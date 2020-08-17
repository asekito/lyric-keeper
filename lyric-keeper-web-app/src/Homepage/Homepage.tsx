import React, { useEffect, useState } from "react";
import {
  WelcomeText,
  StyledSwitch,
  DarkIcon,
  LightIcon,
  StyledLink,
} from "./elements";
import { NewLyricModal } from "NewLyricModal";
import { useMutation } from "react-apollo";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import {
  Mutation_Add_New_Lyric,
  Mutation_Add_New_Lyric_To_User_List,
} from "operations";
import {
  Lyric,
  Add_New_LyricVariables,
  Add_New_Lyric_To_User_List_addNewLyricToUserList,
  Add_New_Lyric_To_User_ListVariables,
  Add_New_Lyric,
} from "Types";
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

  const {
    isLoggedIn,
    setUser,
    currentUser,
    currentUserIsLoading,
  } = currentUserDetails;

  const { darkModeIsEnabled, setDarkMode } = UseDarkMode();

  const [addNewLyric] = useMutation<Add_New_Lyric, Add_New_LyricVariables>(
    Mutation_Add_New_Lyric
  );

  const [addNewLyricToUserList] = useMutation<
    Add_New_Lyric_To_User_List_addNewLyricToUserList,
    Add_New_Lyric_To_User_ListVariables
  >(Mutation_Add_New_Lyric_To_User_List);

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

  const addEntry = async (lyric: Lyric) => {
    if (currentUser) {
      const lyricData = await addNewLyric({ variables: lyric });
      // getAndUpdateAllLyrics({ refetchLyrics: true });

      const lyricId = lyricData.data?.addNewLyric?.id;

      if (lyricId) {
        addNewLyricToUserList({
          variables: { uid: currentUser?.uid, lyricId },
        });
      }
    }
  };

  const handleMarketingLoginButtonClick = () => {
    setMarketingModalIsOpen(false);
    setLoginModalIsOpen(true);
  };

  return (
    <>
      {!isLoggedIn && (
        <MarketingBar onLoginButtonClick={() => setLoginModalIsOpen(true)} />
      )}
      {isLoggedIn && <NewLyricModal addEntry={addEntry} />}
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
        {/* <StyledLink to="/help">
          <HelpOutlineIcon style={{ fontSize: "1.2rem" }} />
          <div style={{ display: "inline", marginLeft: "5px" }}>
            How to use this app
          </div>
        </StyledLink> */}
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
