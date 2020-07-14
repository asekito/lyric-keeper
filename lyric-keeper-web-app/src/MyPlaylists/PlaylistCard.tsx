import React from "react";
import { Get_Current_User_getCurrentUser_playlists } from "Types";
import {
  PlaylistCardWrapper,
  PlaylistCardCounter,
  PlaylistCardTitle,
  PlaylistCardDescriptiveText,
  SmallPlaylistCardText,
} from "./elements";
import { UseDarkMode } from "Hooks";
import { Grid } from "@material-ui/core";

// interface Props {
//   id: string;
//   playlistName: string;
//   lyricList: {
//     lyricId: string;
//   }[];
// }

export const PlaylistCard: React.FC<Get_Current_User_getCurrentUser_playlists> = ({
  id,
  playlistName,
  lyricList,
}) => {
  const { darkModeIsEnabled } = UseDarkMode();

  return (
    <PlaylistCardWrapper darkMode={darkModeIsEnabled}>
      <Grid
        container
        style={{
          width: "80%",
          textAlign: "center",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <Grid item xs={8}>
          <PlaylistCardDescriptiveText>Playlist</PlaylistCardDescriptiveText>
          <PlaylistCardTitle>{playlistName}</PlaylistCardTitle>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "end" }}>
          <PlaylistCardCounter>{lyricList.length}</PlaylistCardCounter>
          <SmallPlaylistCardText>Lyrics</SmallPlaylistCardText>
        </Grid>
      </Grid>
    </PlaylistCardWrapper>
  );
};
