import React, { useState } from "react";
import { Lyric } from "Types";
import { StyledTextField } from "GlobalComponents";
import { UseDarkMode } from "Hooks";
import { DraggableLyricCard } from "./DraggableLyricCard";
import Container from "@material-ui/core/Container";

interface Props {
  lyricList: Lyric[];
  playlistName: string;
}

export const EditView: React.FC<Props> = ({ lyricList, playlistName }) => {
  const [textFieldText, setTextFieldText] = useState(playlistName);
  const { darkModeIsEnabled } = UseDarkMode();
  //   console.log(lyricList);
  return (
    <>
      <div>
        <StyledTextField
          style={{ marginTop: "30px", width: "300px", marginBottom: "30px" }}
          label="Enter the playlist name here"
          name="playlist-name"
          variant="outlined"
          darkMode={darkModeIsEnabled}
          value={textFieldText}
          onChange={({ target: { value } }) => setTextFieldText(value)}
        />
      </div>
      <Container maxWidth="sm">
        {lyricList.map(({ ...props }) => (
          <DraggableLyricCard selectable={false} key={props.id} {...props} />
        ))}
      </Container>
    </>
  );
};
