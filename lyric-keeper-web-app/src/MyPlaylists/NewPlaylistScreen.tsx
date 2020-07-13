import React, { useState, useEffect } from "react";
import {
  Navbar,
  PageWrapper,
  PageHeader,
  Link,
  LoadingScreen,
  LyricCountWrapper,
} from "GlobalComponents";
import { UseDarkMode, UseIsOffline } from "Hooks";
import {
  NewLyricControlButton,
  NoPlaylistsText,
  MainAreaWrapper,
} from "./elements";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useQuery } from "react-apollo";
import { Query_Get_All_Lyrics_Title_And_Author } from "operations";
import {
  Get_All_Lyrics_Title_And_Author,
  Get_All_Lyrics_Title_And_Author_allLyrics,
} from "Types";
import { findNonPrivateLyrics } from "utilities";
import { DraggableLyricCard } from "./DraggableLyricCard";

export const NewPlaylistScreen: React.FC = () => {
  const [selectedLyrics, setSelectedLyrics] = useState([]);
  const [clearAll, setClearAll] = useState(false);
  const [allLyrics, setAllLyrics] = useState<
    Get_All_Lyrics_Title_And_Author["allLyrics"]
  >([]);
  const { darkModeIsEnabled } = UseDarkMode();

  const { isOffline } = UseIsOffline();

  const { data, loading } = useQuery<Get_All_Lyrics_Title_And_Author>(
    Query_Get_All_Lyrics_Title_And_Author,
    { skip: isOffline }
  );

  useEffect(() => {
    if (data && data.allLyrics && !loading) {
      const nonPrivateData = findNonPrivateLyrics<
        Get_All_Lyrics_Title_And_Author_allLyrics
      >(data.allLyrics);

      if (nonPrivateData) {
        setAllLyrics(nonPrivateData);
      }
    }
  }, [data, loading]);

  if (loading) return <LoadingScreen darkMode={darkModeIsEnabled} />;

  return (
    <>
      <Navbar />
      <PageWrapper isDarkMode={darkModeIsEnabled}>
        <PageHeader variant="h4">New Playlist</PageHeader>
        <Link to="/my-playlists">
          <NewLyricControlButton variant="contained">
            <ArrowBackIosIcon /> Back
          </NewLyricControlButton>
        </Link>
        <NewLyricControlButton
          variant="contained"
          onClick={() => {
            setSelectedLyrics([]);
            setClearAll(!clearAll);
          }}
        >
          Clear selection
        </NewLyricControlButton>
        {isOffline ? (
          <NoPlaylistsText
            style={{
              maxWidth: "400px",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            It looks like you're offline! You won't be able to create playlists
            until you're back online, again.
          </NoPlaylistsText>
        ) : (
          <MainAreaWrapper maxWidth="sm">
            <LyricCountWrapper
              darkMode={darkModeIsEnabled}
            >{`Lyrics selected: ${
              Object.keys(selectedLyrics).length
            }`}</LyricCountWrapper>
            <>
              {allLyrics?.map(({ title, author, id }) => (
                <DraggableLyricCard
                  clearAll={clearAll}
                  setSelectedLyrics={setSelectedLyrics}
                  id={id}
                  title={title}
                  author={author}
                />
              ))}
            </>
          </MainAreaWrapper>
        )}
      </PageWrapper>
    </>
  );
};
