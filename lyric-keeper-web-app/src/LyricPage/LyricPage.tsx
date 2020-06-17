import React, { useState, useEffect } from "react";
import { PageWrapper } from "./elements";
import { Snackbar } from "@material-ui/core";
import { LyricView } from "./LyricView";
import { SnackbarButtons } from "./SnackbarButtons";
import { EditView } from "./EditView";

export const LyricPage: React.FC = () => {
  const [lyricData, setLyricData] = useState<any>({ title: "" }); // @TODO: Fix types
  const [edit, setEdit] = useState(false);

  const shortUrl = window.location.pathname.slice(
    7,
    window.location.pathname.length - 1
  );

  useEffect(() => {
    // axios
    //   .get('/getSingleLyricByShortUrl', { params: { shortUrl: shortUrl } })
    //   .then(({ data }) => {
    //     setLyricData(data[0]);
    //   });
    return setLyricData([]);
  }, []);

  const { title, author, chorus, verses } = lyricData;
  return (
    <PageWrapper>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={true}
      >
        <SnackbarButtons edit={edit} setEdit={setEdit} />
      </Snackbar>
      {!edit ? (
        <LyricView
          title={title}
          author={author}
          chorus={chorus}
          verses={verses}
        />
      ) : (
        <EditView
          setEdit={setEdit}
          lyricData={lyricData}
          setLyricData={setLyricData}
        />
      )}
    </PageWrapper>
  );
};
