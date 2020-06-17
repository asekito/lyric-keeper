import React from "react";
import { Homepage } from "Homepage";
import { LyricPage } from "LyricPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

const client = new ApolloClient({
  uri: "https://lyric-keeper-server.herokuapp.com/",
  // uri: "http://localhost:8181/",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Router forceRefresh>
      <Route path="/" exact component={Homepage} />
      <Route path="/lyric/:lyricUrl" component={LyricPage} />
    </Router>
  </ApolloProvider>
);

export default App;
