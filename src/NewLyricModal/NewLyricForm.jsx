import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { TextFieldStyles } from './elements.jsx';

export const NewLyricForm = ({ onClickFunction, lyricData }) => {
  const [title, setTitle] = useState(lyricData.title ? lyricData.title : '');
  const [chorus, setChorus] = useState(
    lyricData.chorus ? lyricData.chorus : ''
  );
  const [verses, setVerses] = useState(
    lyricData.verses ? lyricData.verses : ''
  );
  const [author, setAuthor] = useState(
    lyricData.author ? lyricData.author : ''
  );

  return (
    <>
      {[
        { label: 'Title', value: title, set: setTitle, width: '30%' },
        { label: 'Author', value: author, set: setAuthor, width: '30%' },
        {
          label: 'Chorus',
          value: chorus,
          set: setChorus,
          multiline: true,
          rows: 4,
        },
        {
          label: 'Verses',
          value: verses,
          set: setVerses,
          multiline: true,
          rows: 4,
        },
      ].map(
        ({ label, value, set, width = '60%', multiline = false, rows = 1 }) => (
          <>
            <TextFieldStyles>
              <TextField
                multiline={multiline}
                rowsMax={100}
                rows={rows}
                style={{ width: width }}
                margin="dense"
                label={label}
                value={value}
                onChange={(e) => set(e.target.value)}
              />
            </TextFieldStyles>
          </>
        )
      )}
      <Button
        style={{ margin: '20px' }}
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
