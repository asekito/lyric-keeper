import React, { useState, useEffect } from 'react';
import {
  PageWrapper,
  Songtitle,
  SongAuthor,
  SongChorus,
  SongVerses,
} from './elements.jsx';
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

  const ChorusAndVerse = ({ chorus, verse }) => (
    <>
      <div>{verse}</div>
      <SongChorus>{chorus}</SongChorus>
    </>
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
      {verses && chorus && (
        <>
          <SongChorus>{chorus}</SongChorus>
          <SongVerses>
            {verses.split('(chorus)').map((item, index, arr) => {
              if (index < arr.length - 1) {
                return <ChorusAndVerse chorus={chorus} verse={item} />;
              } else {
                return item;
              }
            })}
          </SongVerses>
        </>
      )}
    </PageWrapper>
  );
};
