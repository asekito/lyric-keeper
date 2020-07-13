import React, { useState, useEffect } from "react";
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
  Lyric,
} from "Types";
import { LyricCard } from "LyricCard";

export const MyLyrics: React.FC<any> = ({ client }) => {
  const [lyrics, setLyrics] = useState<Lyric[]>([]);
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

  useEffect(() => {
    // Handle fetching cached data if offline
    if (!data && !loading) {
      try {
        const cachedData = client.readQuery({
          query: Query_Get_Multiple_Lyrics_By_Id,
          skip: !isLoggedIn || !currentUser?.lyrics?.length,
          variables: {
            ids: currentUser?.lyrics?.map(({ lyricId }) => ({
              lyricId,
            })),
          },
        });
        setLyrics(cachedData.getMultipleLyricsById as any);
      } catch (error) {
        console.log(error);
      }
    }
    if (data) setLyrics(data.getMultipleLyricsById as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  if (loading) return <LoadingScreen darkMode={darkModeIsEnabled} />;

  return (
    <>
      <Navbar {...currentUserDetails} />
      <PageWrapper isDarkMode={darkModeIsEnabled}>
        <PageHeader variant="h4">My Lyrics</PageHeader>
        <MainAreaWrapper maxWidth="sm">
          {lyrics && lyrics.length && isLoggedIn ? (
            <>
              <LyricCountWrapper
                darkMode={darkModeIsEnabled}
              >{`Lyrics: ${lyrics.length}`}</LyricCountWrapper>
              {lyrics.map(({ ...props }) => (
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
