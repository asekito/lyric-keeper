import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { TextFieldStyles } from './elements.jsx';

export const NewLyricForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  return [
    { label: 'Title', value: title, set: setTitle },
    { label: 'Author', value: author, set: setAuthor },
  ].map(({ label, value, set }) => (
    <TextFieldStyles>
      <TextField
        margin="dense"
        label={label}
        value={value}
        onChange={(e) => set(e.target.value)}
      />
    </TextFieldStyles>
  ));
};
