import React from "react";
import { Get_Current_User_getCurrentUser_playlists } from "Types";
import {
  PlaylistCardWrapper,
  PlaylistCardCounter,
  PlaylistCardTitle,
  PlaylistCardDescriptiveText,
  SmallPlaylistCardText,
} from "./elements";
import { UseDarkMode, UseResponsiveCheck } from "Hooks";
import { Grid } from "@material-ui/core";
import { Link } from "GlobalComponents";

export const PlaylistCard: React.FC<Get_Current_User_getCurrentUser_playlists> = ({
  id,
  playlistName,
  lyricList,
}) => {
  const { darkModeIsEnabled } = UseDarkMode();
  const { isMobile } = UseResponsiveCheck();

  return (
    <Link to={`/playlist/${id}`}>
      <PlaylistCardWrapper darkMode={darkModeIsEnabled}>
        <Grid
          container
          style={{
            width: "80%",
            textAlign: "center",
            marginRight: "auto",
            marginLeft: isMobile ? "16px" : "auto",
          }}
        >
          <Grid item xs={10}>
            <PlaylistCardDescriptiveText>Playlist</PlaylistCardDescriptiveText>
            <PlaylistCardTitle>{playlistName}</PlaylistCardTitle>
          </Grid>
          <Grid item xs={2} style={{ textAlign: "end" }}>
            <PlaylistCardCounter>{lyricList.length}</PlaylistCardCounter>
            <SmallPlaylistCardText>Lyrics</SmallPlaylistCardText>
          </Grid>
        </Grid>
      </PlaylistCardWrapper>
    </Link>
  );
};
