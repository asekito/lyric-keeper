import React, { useState, useEffect } from "react";
import {
  Navbar,
  PageWrapper,
  PageHeader,
  Link,
  LoadingScreen,
  LyricCountWrapper,
  StyledTextField,
} from "GlobalComponents";
import { UseDarkMode, UseIsOffline } from "Hooks";
import {
  NewLyricControlButton,
  NoPlaylistsText,
  MainAreaWrapper,
  NewPlaylistDescriptiveText,
  ErrorText,
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
import SaveIcon from "@material-ui/icons/Save";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import { useHistory } from "react-router-dom";

export const NewPlaylistScreen: React.FC = () => {
  const [textFieldText, setTextFieldText] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedLyrics, setSelectedLyrics] = useState([]);
  const [clearAll, setClearAll] = useState(false);
  const [allLyrics, setAllLyrics] = useState<
    Get_All_Lyrics_Title_And_Author["allLyrics"]
  >([]);
  const history = useHistory();
  const { darkModeIsEnabled } = UseDarkMode();

  const { isOffline } = UseIsOffline();

  const { data, loading } = useQuery<Get_All_Lyrics_Title_And_Author>(
    Query_Get_All_Lyrics_Title_And_Author,
    { skip: isOffline }
  );

  const submitNewPlaylist = () => {
    setErrors([]);
    const selectedLyricsLength = Object.keys(selectedLyrics).length;
    if (!textFieldText.length || !selectedLyricsLength) {
      if (!textFieldText.length)
        setErrors(["Uh oh! It looks like you forgot to name your playlist!"]);
      if (!selectedLyricsLength)
        setErrors(allErrors => [
          ...allErrors,
          "Oh no! You need to add at least ONE lyric to your playlist!",
        ]);
    } else {
      history.push("/my-playlists");
    }
  };

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
        <StyledTextField
          style={{ marginTop: "30px", width: "300px" }}
          label="Enter the playlist name here"
          name="playlist-name"
          variant="outlined"
          darkMode={darkModeIsEnabled}
          value={textFieldText}
          onChange={({ target: { value } }) => setTextFieldText(value)}
        />
        <NewPlaylistDescriptiveText>
          Select the lyrics you'd like to add to your new playlist.
        </NewPlaylistDescriptiveText>
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
          Clear selection <ClearAllIcon />
        </NewLyricControlButton>
        <NewLyricControlButton onClick={submitNewPlaylist} variant="contained">
          Save <SaveIcon style={{ height: "20px" }} />
        </NewLyricControlButton>
        {errors &&
          errors.map(e => <ErrorText key={e.slice(0, 4)}>{e}</ErrorText>)}
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
