import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  const { title, author } = lyricData;
  return (
    <div>
      <h1>Currently visiting: {shortUrl}</h1>
      <h2>Title: {title}</h2>
      <h2>Testing...</h2>
    </div>
  );
};
