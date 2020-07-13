import React, { useState } from "react";
import { UseDarkMode, UseCurrentUser } from "Hooks";
import { Navbar, PageWrapper, PageHeader, Link } from "GlobalComponents";
import { NoPlaylistsText, NewPlaylistButton } from "./elements";
import AddIcon from "@material-ui/icons/Add";

export const MyPlaylists: React.FC = () => {
  const [playLists, setPlayLists] = useState([]);
  const { darkModeIsEnabled } = UseDarkMode();
  const currentUserDetails = UseCurrentUser();

  const { isLoggedIn } = currentUserDetails;

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
            {playLists.length ? (
              <></>
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
