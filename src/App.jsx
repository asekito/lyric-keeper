import React from 'react';
import {
  WelcomeText,
  DefaultPageWrapper,
  MainAreaWrapper,
} from './elements.jsx';

export const App = () => (
  <DefaultPageWrapper>
    <WelcomeText>Lyric Keeper</WelcomeText>
    <MainAreaWrapper>You haven't stored any lyrics, yet</MainAreaWrapper>
  </DefaultPageWrapper>
);
