import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { TextFieldStyles } from "./elements";

export const NewLyricForm: React.FC<any> = ({ onClickFunction, lyricData }) => { // @TODO: Fix types
  const [title, setTitle] = useState(
    lyricData && lyricData.title ? lyricData.title : ""
  );
  const [chorus, setChorus] = useState(
    lyricData && lyricData.chorus ? lyricData.chorus : ""
  );
  const [verses, setVerses] = useState(
    lyricData && lyricData.verses ? lyricData.verses : ""
  );
  const [author, setAuthor] = useState(
    lyricData && lyricData.author ? lyricData.author : ""
  );
  const [showHelp, setShowHelp] = useState(true);

  return (
    <>
      {[
        {
          label: "Title",
          value: title,
          set: setTitle,
          width: "30%",
          helpText: "Title of song",
        },
        {
          label: "Artist",
          value: author,
          set: setAuthor,
          width: "30%",
          helpText: "Artist of song",
        },
        {
          label: "Chorus",
          value: chorus,
          set: setChorus,
          multiline: true,
          rows: 4,
          helpText:
            "Chorus of the song. This will get placed in the body of the lyric anywhere you use the phrase: (chorus)",
        },
        {
          label: "Verses",
          value: verses,
          set: setVerses,
          multiline: true,
          rows: 4,
          helpText:
            "Verses of song. Use (chorus) anywhere the above chorus is needed",
        },
      ].map(
        ({
          label,
          value,
          set,
          width = "60%",
          multiline = false,
          rows = 1,
          helpText,
        }) => (
          <>
            <TextFieldStyles>
              <TextField
                required
                multiline={multiline}
                rowsMax={100}
                rows={rows}
                style={{ width: width }}
                margin="dense"
                label={label}
                value={value}
                onChange={e => set(e.target.value)}
                placeholder={helpText}
              />
            </TextFieldStyles>
          </>
        )
      )}
      <Button
        style={{ margin: "20px" }}
        variant="contained"
        onClick={() => {
          onClickFunction(title, chorus, verses, author);
        }}
      >
        Save
      </Button>
    </>
  );
};
