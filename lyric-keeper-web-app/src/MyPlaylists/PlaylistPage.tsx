import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-apollo";
import {
  Query_Find_Playlist_With_Id,
  Query_Get_Multiple_Lyrics_By_Id,
  Mutation_Delete_Playlist,
} from "operations";
import { UseCurrentUser, UseDarkMode, UseIsOffline } from "Hooks";
import {
  Find_Playlist_With_Id_findPlaylistWithId,
  Find_Playlist_With_Id,
  Find_Playlist_With_IdVariables,
  Get_Multiple_Lyrics_By_Id,
  Get_Multiple_Lyrics_By_IdVariables,
  Lyric,
  Delete_Playlist,
  Delete_PlaylistVariables,
} from "Types";
import {
  LoadingScreen,
  Navbar,
  PageWrapper,
  PageHeader,
  LyricCountWrapper,
  Link,
  AreYouSureDialog,
} from "GlobalComponents";
import { LyricCard } from "LyricCard";
import Container from "@material-ui/core/Container";
import { NewLyricControlButton, NoPlaylistsText } from "./elements";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Edit from "@material-ui/icons/Edit";
import Cancel from "@material-ui/icons/Cancel";
import Delete from "@material-ui/icons/Delete";
import { EditView } from "./EditView";
import { useHistory } from "react-router-dom";
import { orderLyricsBasedOnIdList } from "utilities";

export const PlaylistPage: React.FC<any> = ({ client }) => {
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
  const [lyrics, setLyrics] = useState<Lyric[]>([]);
  const [editView, setEditView] = useState(false);
  const [playlistData, setPlaylistData] = useState<
    Find_Playlist_With_Id_findPlaylistWithId
  >();
  const currentUserDetails = UseCurrentUser();
  const { isLoggedIn, currentUser } = currentUserDetails;
  const { darkModeIsEnabled } = UseDarkMode();
  const history = useHistory();
  const { isOffline } = UseIsOffline();

  const playlistId = window.location.pathname.slice(
    10,
    window.location.pathname.length
  );

  const [
    deletePlaylist,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation<Delete_Playlist, Delete_PlaylistVariables>(
    Mutation_Delete_Playlist
  );

  const findPlaylistWithId = useQuery<
    Find_Playlist_With_Id,
    Find_Playlist_With_IdVariables
  >(Query_Find_Playlist_With_Id, {
    skip: !isLoggedIn,
    variables: { uid: currentUser?.uid, playlistId } as any,
  });

  const { data, loading, refetch: refetchPlaylistData } = findPlaylistWithId;

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
  }, [data, loading, playlistData]);

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
        setLyrics(cachedData.data.getMultipleLyricsById as any);
      } catch (error) {
        console.log(error);
      }
    }
    if (lyricListData.data) {
      setLyrics(
        orderLyricsBasedOnIdList<Lyric>({
          fullLyricData: lyricListData.data.getMultipleLyricsById as any,
          lyricIdList: playlistData?.lyricList as any,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lyricListData.data, lyricListData.loading, playlistData]);

  useEffect(() => {
    setEditView(false);
  }, [data]);

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

  if (loading || lyricListData.loading || !playlistData)
    return <LoadingScreen darkMode={darkModeIsEnabled} />;

  const refetchAllData = () => {
    refetchPlaylistData();
  };

  return (
    <>
      <Navbar {...currentUserDetails} />
      {currentUser && (
        <AreYouSureDialog
          entryTitle={playlistData?.playlistName}
          onClickDelete={() => {
            deletePlaylist({
              variables: { uid: currentUser.uid, playlistId: playlistData.id },
            });
            if (!mutationLoading && !mutationError)
              history.push("/my-playlists");
          }}
          isOpen={deleteDialogIsOpen}
          setIsOpen={setDeleteDialogIsOpen}
          confirmationText="Are you sure you want to delete your playlist: "
        />
      )}
      <PageWrapper isDarkMode={darkModeIsEnabled}>
        {!editView && (
          <Link to="/my-playlists">
            <NewLyricControlButton
              style={{ marginBottom: "10px" }}
              variant="contained"
            >
              <ArrowBackIosIcon /> Back
            </NewLyricControlButton>
          </Link>
        )}
        {!editView && !isOffline && (
          <NewLyricControlButton
            style={{ marginBottom: "10px" }}
            variant="contained"
            onClick={() => setEditView(true)}
          >
            <Edit /> Edit
          </NewLyricControlButton>
        )}
        {editView && (
          <NewLyricControlButton
            style={{ marginBottom: "10px" }}
            variant="contained"
            onClick={() => {
              setEditView(false);
              refetchAllData();
            }}
          >
            <Cancel /> Cancel
          </NewLyricControlButton>
        )}
        {editView && (
          <NewLyricControlButton
            style={{ marginBottom: "10px" }}
            variant="contained"
            onClick={() => setDeleteDialogIsOpen(true)}
          >
            <Delete /> Delete Playlist
          </NewLyricControlButton>
        )}
        {!editView ? (
          <Container maxWidth="sm">
            <>
              <PageHeader style={{ paddingBottom: "30px" }} variant="h4">
                {playlistData?.playlistName}
              </PageHeader>
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
          </Container>
        ) : (
          <EditView
            playlistName={playlistData?.playlistName}
            lyricList={lyrics}
            playlistId={playlistData.id}
            refetchAllData={refetchAllData}
          />
        )}
      </PageWrapper>
    </>
  );
};
