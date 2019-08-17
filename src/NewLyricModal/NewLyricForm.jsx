import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { TextFieldStyles } from './elements.jsx';

export const NewLyricForm = ({ addEntry, setOpen }) => {
  const [title, setTitle] = useState('');
  const [chorus, setChorus] = useState('');
  const [verses, setVerses] = useState('');
  const [author, setAuthor] = useState('');

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
        style={{ marginTop: '20px' }}
        variant="contained"
        onClick={() => {
          addEntry(title, chorus, verses, author);
          setOpen(false);
        }}
      >
        Save
      </Button>
    </>
  );
};
