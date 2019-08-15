import React, { useEffect } from 'react';
import {
  WelcomeText,
  DefaultPageWrapper,
  MainAreaWrapper,
} from './elements.jsx';

export const App = () => {
  let lyricData = [];

  useEffect(() => {
    console.log('Make API call');
  });

  return (
    <DefaultPageWrapper>
      <WelcomeText>Lyric Keeper</WelcomeText>
      <MainAreaWrapper>
        {lyricData.length
          ? lyricData.map(item => item)
          : "You haven't stored any lyrics, yet"}
      </MainAreaWrapper>
    </DefaultPageWrapper>
  );
};
