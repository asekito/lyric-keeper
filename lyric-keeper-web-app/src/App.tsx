import React, { useEffect, useState } from "react";
import { Homepage } from "Homepage";
import { LyricPage } from "LyricPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState<any>(null);
  const cache = new InMemoryCache();

  useEffect(() => {
    const setPersistantCache = async () => {
      await persistCache({
        cache,
        storage: window.sessionStorage as any,
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
          <Route path="/" exact component={Homepage} />
          <Route
            path="/lyric/:lyricUrl"
            component={() => <LyricPage client={client} />}
          />
        </Router>
      </ApolloProvider>
    );

  return <></>;
}

export default App;
