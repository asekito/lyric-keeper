import React, { useState, useEffect } from 'react';
import { PageWrapper, Songtitle, SongAuthor } from './elements.jsx';
import { Snackbar, Button } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import axios from 'axios';
import { Link } from '../GlobalComponents.jsx';

export const LyricPage = () => {
  const [lyricData, setLyricData] = useState({ title: '' });
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
        <Link to="/">
          <Button size="large" variant="contained">
            <Home /> Home
          </Button>
        </Link>
      </Snackbar>
      <Songtitle>{title}</Songtitle>
      <SongAuthor>{author}</SongAuthor>
      {chorus}
      {verses}
    </PageWrapper>
  );
};
