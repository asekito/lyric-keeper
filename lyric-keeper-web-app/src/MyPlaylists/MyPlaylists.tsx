import React, { useState, useEffect } from "react";
import { UseDarkMode, UseCurrentUser } from "Hooks";
import { Navbar, PageWrapper, PageHeader, Link } from "GlobalComponents";
import { NoPlaylistsText, NewPlaylistButton } from "./elements";
import AddIcon from "@material-ui/icons/Add";
import { Get_Current_User_getCurrentUser } from "Types";
import { PlaylistCard } from "./PlaylistCard";
import Container from "@material-ui/core/Container";

export const MyPlaylists: React.FC = () => {
  const [playLists, setPlayLists] = useState<
    Get_Current_User_getCurrentUser["playlists"]
  >([]);
  const { darkModeIsEnabled } = UseDarkMode();
  const currentUserDetails = UseCurrentUser();

  const { isLoggedIn, currentUser } = currentUserDetails;

  useEffect(() => {
    if (currentUser?.playlists) setPlayLists(currentUser?.playlists);
    console.log(currentUser?.playlists);
  }, [currentUser]);

  return (
    <>
      <Navbar {...currentUserDetails} />
      <PageWrapper isDarkMode={darkModeIsEnabled}>
        <PageHeader variant="h4">My Playlists</PageHeader>
        <Link to="/new-playlist">
          <NewPlaylistButton variant="contained">
            New Playlist <AddIcon />
          </NewPlaylistButton>
        </Link>
        {isLoggedIn ? (
          <>
            {playLists && playLists.length ? (
              <Container maxWidth="sm">
                {playLists.map(({ ...props }) => (
                  <PlaylistCard {...props} />
                ))}
              </Container>
            ) : (
              <NoPlaylistsText>
                It looks like you haven't created any playlists yet.
              </NoPlaylistsText>
            )}
          </>
        ) : (
          <NoPlaylistsText>
            It looks like you're logged out! You must be logged in to create
            playlists
          </NoPlaylistsText>
        )}
      </PageWrapper>
    </>
  );
};
