import React, { useEffect, useState } from "react";
import { Homepage } from "Homepage";
import { LyricPage } from "LyricPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import localForage from "localforage";
import { MyLyrics } from "MyLyrics";
import { HelpPage } from "HelpPage";
import { MyPlaylists, NewPlaylistScreen, PlaylistPage } from "MyPlaylists";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState<any>(null);
  const cache = new InMemoryCache();

  useEffect(() => {
    const setPersistantCache = async () => {
      await persistCache({
        cache,
        storage: localForage as any,
      });
    };

    setPersistantCache();
    setClient(
      new ApolloClient({
        uri: "https://lyric-keeper-server.herokuapp.com/",
        // uri: "http://localhost:8181/",
        cache,
      })
    );
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loaded && client)
    return (
      <ApolloProvider client={client}>
        <Router forceRefresh>
          <Route
            path="/"
            exact
            component={() => <Homepage client={client} />}
          />
          <Route
            path="/lyric/:lyricUrl"
            component={() => <LyricPage client={client} />}
          />
          <Route
            path="/my-lyrics"
            component={() => <MyLyrics client={client} />}
          />
          <Route path="/help" component={() => <HelpPage />} />
          <Route path="/my-playlists" component={() => <MyPlaylists />} />
          <Route path="/new-playlist" component={() => <NewPlaylistScreen />} />
          <Route
            path="/playlist/:playlistId"
            component={() => <PlaylistPage client={client} />}
          />
        </Router>
      </ApolloProvider>
    );

  return <></>;
}

export default App;
