import React, { useState, useEffect } from "react";
import { PageWrapper } from "./elements";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { LyricView } from "./LyricView";
import { SnackbarButtons } from "./SnackbarButtons";
import { EditView } from "./EditView";
import { Lyric } from "Types";
import { useQuery } from "react-apollo";
import { Query_Find_Lyric_With_Short_Url } from "operations";

export const LyricPage: React.FC = () => {
  const [lyricData, setLyricData] = useState<Lyric | null>();
  const [edit, setEdit] = useState(false);

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

  console.log(data);

  useEffect(() => {
    data && setLyricData(data.findLyricWithShortUrl[0]);
  }, [data]);

  if (loading)
    return (
      <CircularProgress
        size="large"
        style={{ textAlign: "center", marginTop: "20%" }}
      />
    );

  if (lyricData === undefined || !lyricData) return <h1>Lyric not found</h1>;

  if (error) console.log(error);

  const { title, author, chorus, verses } = lyricData;

  return (
    <PageWrapper>
      {/* <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={true}
      >
        <SnackbarButtons edit={edit} setEdit={setEdit} />
      </Snackbar> */}
      {!edit ? (
        <LyricView
          title={title}
          author={author}
          chorus={chorus}
          verses={verses}
        />
      ) : (
        <EditView setEdit={setEdit} lyricData={lyricData} refetch={refetch} />
      )}
    </PageWrapper>
  );
};
