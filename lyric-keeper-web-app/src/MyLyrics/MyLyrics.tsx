import React from "react";
import { MainAreaWrapper, NoLyricsFoundText } from "./elements";
import { UseDarkMode, UseCurrentUser } from "Hooks";
import {
  Link,
  Navbar,
  LoadingScreen,
  PageHeader,
  PageWrapper,
  LyricCountWrapper,
} from "GlobalComponents";
import { useQuery } from "react-apollo";
import { Query_Get_Multiple_Lyrics_By_Id } from "operations";
import {
  Get_Multiple_Lyrics_By_Id,
  Get_Multiple_Lyrics_By_IdVariables,
} from "Types";
import { LyricCard } from "LyricCard";

export const MyLyrics: React.FC = () => {
  const { darkModeIsEnabled } = UseDarkMode();
  const currentUserDetails = UseCurrentUser();

  const { isLoggedIn, currentUser } = currentUserDetails;

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
      <Navbar {...currentUserDetails} />
      <PageWrapper isDarkMode={darkModeIsEnabled}>
        <PageHeader variant="h4">My Lyrics</PageHeader>
        <MainAreaWrapper maxWidth="sm">
          {data?.getMultipleLyricsById &&
          data?.getMultipleLyricsById.length &&
          isLoggedIn ? (
            <>
              <LyricCountWrapper
                darkMode={darkModeIsEnabled}
              >{`Lyrics: ${data.getMultipleLyricsById.length}`}</LyricCountWrapper>
              {data.getMultipleLyricsById.map(({ ...props }) => (
                <LyricCard
                  showDeleteButton
                  currentUser={currentUser}
                  darkModeIsEnabled={darkModeIsEnabled}
                  getAndUpdateAllLyrics={() => refetch()}
                  {...props}
                />
              ))}
            </>
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
