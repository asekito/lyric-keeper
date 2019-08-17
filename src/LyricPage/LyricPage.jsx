import React, { useState, useEffect } from 'react';
import { PageWrapper } from './elements.jsx';
import { Snackbar } from '@material-ui/core';
import axios from 'axios';
import { LyricView } from './LyricView.jsx';
import { SnackbarButtons } from './SnackbarButtons.jsx';
import { EditView } from './EditView.jsx';

export const LyricPage = () => {
  const [lyricData, setLyricData] = useState({ title: '' });
  const [edit, setEdit] = useState(false);

  const shortUrl = window.location.pathname.slice(
    7,
    window.location.pathname.length - 1
  );

  useEffect(() => {
    axios
      .get('/getSingleLyricByShortUrl', { params: { shortUrl: shortUrl } })
      .then(({ data }) => {
        setLyricData(data[0]);
      });
  }, []);

  const { title, author, chorus, verses } = lyricData;
  return (
    <PageWrapper>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={true}
      >
        <SnackbarButtons edit={edit} setEdit={setEdit} />
      </Snackbar>
      {!edit ? (
        <LyricView
          title={title}
          author={author}
          chorus={chorus}
          verses={verses}
        />
      ) : (
        <EditView />
      )}
    </PageWrapper>
  );
};
