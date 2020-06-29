import React, { useState, useEffect } from "react";
import { PageWrapper, StyledErrorMessage } from "./elements";
import Snackbar from "@material-ui/core/Snackbar";
import { LyricView } from "./LyricView";
import { SnackbarButtons } from "./SnackbarButtons";
import { EditView } from "./EditView";
import { Lyric } from "Types";
import { useQuery } from "react-apollo";
import { Query_Find_Lyric_With_Short_Url } from "operations";
import { Link, LoadingScreen } from "GlobalComponents";
import NoSleep from "nosleep.js";
import { UseDarkMode } from "Hooks";

const noSleep = new NoSleep();

export const LyricPage: React.FC<any> = ({ client }) => {
  const [lyricData, setLyricData] = useState<Lyric | null>();
  const [edit, setEdit] = useState(false);

  const { darkModeIsEnabled } = UseDarkMode();

  const shortUrl = window.location.pathname.slice(
    7,
    window.location.pathname.length
  );

  const { data, loading, error, refetch } = useQuery(
    Query_Find_Lyric_With_Short_Url,
    {
      variables: { shortUrl },
    }
  );

  document.addEventListener(
    "touchstart",
    function enableNoSleep() {
      document.removeEventListener("click", enableNoSleep, false);
      noSleep.enable();
    },
    false
  );

  useEffect(() => {
    // Handle fetching cached data if offline
    if (!data && !loading) {
      try {
        const cachedData = client.readQuery({
          query: Query_Find_Lyric_With_Short_Url,
          variables: { shortUrl } as any,
        });
        setLyricData(cachedData.findLyricWithShortUrl[0] as any);
      } catch (error) {
        console.log(error);
      }
    }
    if (data) setLyricData(data.findLyricWithShortUrl[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  if (loading) return <LoadingScreen darkMode={darkModeIsEnabled} />;

  if (lyricData === undefined || !lyricData)
    return (
      <StyledErrorMessage>
        Sorry! It looks like this Lyric doesn't exist!
        <br />
        <Link to="/">Click here to go back</Link>
      </StyledErrorMessage>
    );

  if (error) console.log(error);

  return (
    <PageWrapper darkMode={darkModeIsEnabled}>
      <Snackbar
        style={{ width: "30px" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={true}
      >
        <SnackbarButtons edit={edit} setEdit={setEdit} />
      </Snackbar>
      {!edit ? (
        <LyricView darkModeIsEnabled={darkModeIsEnabled} {...lyricData} />
      ) : (
        <EditView setEdit={setEdit} lyricData={lyricData} refetch={refetch} />
      )}
    </PageWrapper>
  );
};
