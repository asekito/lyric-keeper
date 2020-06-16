import React from "react";
import { Homepage } from "Homepage";
import { LyricPage } from "LyricPage";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
  <Router forceRefresh>
    <Route path="/" exact component={Homepage} />
    <Route path="/lyric/:lyricUrl" component={LyricPage} />
  </Router>
);

export default App;
