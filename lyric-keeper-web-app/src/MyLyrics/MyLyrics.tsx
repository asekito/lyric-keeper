import React, { useState } from "react";
import {
  PageHeader,
  PageWrapper,
  MainAreaWrapper,
  NoLyricsFoundText,
} from "./elements";
import { UseDarkMode, UseCurrentUser } from "Hooks";
import {
  Link,
  LoadingIndicator,
  Navbar,
  LoginCreateAccountModal,
  LoadingScreen,
} from "GlobalComponents";
import { useQuery } from "react-apollo";
import { Query_Get_Multiple_Lyrics_By_Id } from "operations";
import {
  Get_Multiple_Lyrics_By_Id,
  Get_Multiple_Lyrics_By_IdVariables,
} from "Types";
import { LyricCard } from "LyricCard";

export const MyLyrics: React.FC = () => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const { darkModeIsEnabled } = UseDarkMode();
  const {
    currentUser,
    isLoggedIn,
    logout,
    currentUserIsLoading,
    setUser,
  } = UseCurrentUser();

  const { data, loading, refetch } = useQuery<
    Get_Multiple_Lyrics_By_Id,
    Get_Multiple_Lyrics_By_IdVariables
  >(Query_Get_Multiple_Lyrics_By_Id, {
    skip: !isLoggedIn || !currentUser?.lyrics?.length,
    variables: {
      ids: currentUser?.lyrics?.map(({ lyricId }) => ({
        lyricId,
      })),
    },
  });

  if (loading) return <LoadingScreen darkMode={darkModeIsEnabled} />;

  return (
    <>
      <Navbar
        currentUser={currentUser}
        logout={logout}
        isLoggedIn={isLoggedIn}
        openLoginModal={() => setLoginModalIsOpen(!loginModalIsOpen)}
      />
      <LoginCreateAccountModal
        currentUserIsLoading={currentUserIsLoading}
        isOpen={loginModalIsOpen}
        setIsOpen={() => setLoginModalIsOpen(!loginModalIsOpen)}
        setUser={setUser}
      />
      <PageWrapper isDarkMode={darkModeIsEnabled}>
        <PageHeader variant="h4">My Lyrics</PageHeader>
        <MainAreaWrapper maxWidth="sm">
          {data?.getMultipleLyricsById &&
          data?.getMultipleLyricsById.length &&
          isLoggedIn ? (
            data.getMultipleLyricsById.map(({ ...props }) => (
              <LyricCard
                showDeleteButton
                currentUser={currentUser}
                darkModeIsEnabled={darkModeIsEnabled}
                getAndUpdateAllLyrics={() => refetch()}
                {...props}
              />
            ))
          ) : (
            <NoLyricsFoundText>
              It looks like you haven't created any lyrics yet. You can create
              new lyrics from the <Link to="/">Homescreen</Link>
            </NoLyricsFoundText>
          )}
        </MainAreaWrapper>
      </PageWrapper>
    </>
  );
};
