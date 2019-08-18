import React from 'react';
import { HomePage } from './HomePage';
import { LyricPage } from './LyricPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export const App = () => (
  <Router forceRefresh>
    <Route path="/" exact component={HomePage} />
    <Route path="/lyric/:lyricUrl" component={LyricPage} />
  </Router>
);
