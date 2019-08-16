import React, { useEffect } from 'react';
import {
  WelcomeText,
  DefaultPageWrapper,
  MainAreaWrapper,
} from './elements.jsx';

import { Button, Snackbar, Fab } from '@material-ui/core';
import { AddIcon } from '@material-ui/icons';

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
          ? lyricData.map((item) => item)
          : "You haven't stored any lyrics, yet"}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={true}
        >
          <Button size="large" variant="contained">
            <Fab>
              <AddIcon />
            </Fab>
            New Lyric
          </Button>
        </Snackbar>
      </MainAreaWrapper>
    </DefaultPageWrapper>
  );
};
