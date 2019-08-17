import React, { useEffect, useState } from 'react';
import {
  WelcomeText,
  DefaultPageWrapper,
  MainAreaWrapper,
} from './elements.jsx';
import { LyricCard } from '../LyricCard';
import { NewLyricModal } from '../NewLyricModal';
import axios from 'axios';
import { Link } from '../GlobalComponents.jsx';

export const HomePage = () => {
  const [lyricData, setLyricData] = useState([]);

  const getAndUpdateAllLyrics = () => {
    axios.get('/getAllLyrics').then(({ data }) => setLyricData(data));
  };

  useEffect(() => {
    getAndUpdateAllLyrics();
  }, []);

  const addEntry = (title, chorus, verses, author) => {
    axios({
      method: 'post',
      url: '/newLyricEntry',
      data: {
        title: title,
        chorus: chorus,
        verses: verses,
        author: author,
      },
    }).then(() => getAndUpdateAllLyrics());
  };

  return (
    <DefaultPageWrapper>
      <WelcomeText>Lyric Keeper</WelcomeText>
      <MainAreaWrapper>
        {lyricData.length
          ? lyricData.map(({ title, author, shortUrl }) => (
              <Link to={`/lyric/${shortUrl}`}>
                <LyricCard title={title} author={author} />
              </Link>
            ))
          : "You haven't stored any lyrics, yet"}
        <NewLyricModal addEntry={addEntry} />
      </MainAreaWrapper>
    </DefaultPageWrapper>
  );
};
