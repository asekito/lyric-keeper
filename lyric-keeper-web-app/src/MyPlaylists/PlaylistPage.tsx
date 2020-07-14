import React, { useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import {
  Query_Find_Playlist_With_Id,
  Query_Get_Multiple_Lyrics_By_Id,
} from "operations";
import { UseCurrentUser, UseDarkMode } from "Hooks";
import {
  Find_Playlist_With_Id_findPlaylistWithId,
  Find_Playlist_With_Id,
  Find_Playlist_With_IdVariables,
  Get_Multiple_Lyrics_By_Id,
  Get_Multiple_Lyrics_By_IdVariables,
  Lyric,
} from "Types";
import {
  LoadingScreen,
  Navbar,
  PageWrapper,
  PageHeader,
  LyricCountWrapper,
  Link,
} from "GlobalComponents";
import { LyricCard } from "LyricCard";
import Container from "@material-ui/core/Container";
import { NewLyricControlButton, NoPlaylistsText } from "./elements";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

export const PlaylistPage: React.FC<any> = ({ client }) => {
  const [lyrics, setLyrics] = useState<Lyric[]>([]);
  const [playlistData, setPlaylistData] = useState<
    Find_Playlist_With_Id_findPlaylistWithId
  >();
  const currentUserDetails = UseCurrentUser();
  const { isLoggedIn, currentUser } = currentUserDetails;
  const { darkModeIsEnabled } = UseDarkMode();

  const playlistId = window.location.pathname.slice(
    10,
    window.location.pathname.length
  );

  const { data, loading, error, refetch } = useQuery<
    Find_Playlist_With_Id,
    Find_Playlist_With_IdVariables
  >(Query_Find_Playlist_With_Id, {
    skip: !isLoggedIn,
    variables: { uid: currentUser?.uid, playlistId } as any,
  });

  useEffect(() => {
    // Handle fetching cached data if offline
    if (!data && !loading) {
      try {
        const cachedData = client.readQuery({
          query: Query_Find_Playlist_With_Id,
          variables: { uid: currentUser?.uid, playlistId },
        });
        setPlaylistData(cachedData.findPlaylistWithId);
      } catch (error) {
        console.log(error);
      }
    }
    if (data) setPlaylistData(data.findPlaylistWithId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  // ////// GET DATA FOR LYRICS \\\\\\

  const lyricListData = useQuery<
    Get_Multiple_Lyrics_By_Id,
    Get_Multiple_Lyrics_By_IdVariables
  >(Query_Get_Multiple_Lyrics_By_Id, {
    skip: !isLoggedIn || !playlistData?.lyricList.length,
    variables: {
      ids: playlistData?.lyricList.map(item => ({
        lyricId: item ? item.lyricId : "",
      })),
    },
  });

  useEffect(() => {
    // Handle fetching cached data if offline
    if (!lyricListData.data && !lyricListData.loading) {
      try {
        const cachedData = client.readQuery({
          query: Query_Get_Multiple_Lyrics_By_Id,
          skip: !isLoggedIn || !playlistData?.lyricList.length,
          variables: {
            ids: playlistData?.lyricList.map(item => ({
              lyricId: item ? item.lyricId : "",
            })),
          },
        });
        setLyrics(cachedData.getMultipleLyricsById as any);
      } catch (error) {
        console.log(error);
      }
    }
    if (lyricListData.data)
      setLyrics(lyricListData.data.getMultipleLyricsById as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lyricListData.data, lyricListData.loading]);

  if (!isLoggedIn)
    return (
      <>
        <Navbar {...currentUserDetails} />
        <PageWrapper isDarkMode={darkModeIsEnabled}>
          <NoPlaylistsText>
            You may only view this playlist if you are logged in and are the one
            who created it.
          </NoPlaylistsText>
        </PageWrapper>
      </>
    );

  if (loading || lyricListData.loading)
    return <LoadingScreen darkMode={darkModeIsEnabled} />;

  return (
    <>
      <Navbar {...currentUserDetails} />
      <PageWrapper isDarkMode={darkModeIsEnabled}>
        <Link to="/my-playlists">
          <NewLyricControlButton
            style={{ marginBottom: "10px" }}
            variant="contained"
          >
            <ArrowBackIosIcon /> Back
          </NewLyricControlButton>
        </Link>
        <PageHeader variant="h4">{playlistData?.playlistName}</PageHeader>
        <Container maxWidth="sm" style={{ marginTop: "40px" }}>
          {
            <>
              <LyricCountWrapper
                darkMode={darkModeIsEnabled}
              >{`Lyrics: ${lyrics.length}`}</LyricCountWrapper>
              {lyrics.map(({ ...props }) => (
                <LyricCard
                  currentUser={currentUser}
                  darkModeIsEnabled={darkModeIsEnabled}
                  {...props}
                />
              ))}
            </>
          }
        </Container>
      </PageWrapper>
    </>
  );
};
