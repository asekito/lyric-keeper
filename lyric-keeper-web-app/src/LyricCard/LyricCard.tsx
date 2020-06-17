import React from "react";
import {
  CardWrapper,
  CardTitle,
  CardAuthor,
  TitleAuthorDivider,
} from "./elements";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "GlobalComponents";
import { useMutation } from "react-apollo";
import { Delete_Lyric_Matching_Short_UrlVariables } from "Types";
import { Mutation_Delete_Lyric_Matching_Short_Url } from "operations";
import { truncate } from "utilities";

interface Props {
  title: string;
  author: string;
  shortUrl: string;
  getAndUpdateAllLyrics(): void;
}

export const LyricCard: React.FC<Props> = ({
  title,
  author,
  shortUrl,
  getAndUpdateAllLyrics,
}) => {
  const [deleteLyric, { loading }] = useMutation<{
    deleteLyric: Delete_Lyric_Matching_Short_UrlVariables;
  }>(Mutation_Delete_Lyric_Matching_Short_Url, {
    onCompleted: () => getAndUpdateAllLyrics(),
  });

  if (loading) console.log(loading);

  return (
    <div style={{ display: "block" }}>
      <CardWrapper>
        <IconButton
          onClick={() => deleteLyric({ variables: { shortUrl } })}
          style={{
            display: "inline",
            verticalAlign: "super",
            marginRight: "5px",
          }}
        >
          <Delete />
          {loading && <CircularProgress />}
        </IconButton>
        <Link to={`/lyric/${shortUrl}`} style={{ display: "inline-block" }}>
          <CardTitle>{truncate({ string: title, limit: 14 })}</CardTitle>
          <TitleAuthorDivider>{" | "}</TitleAuthorDivider>
          {author && (
            <CardAuthor>{truncate({ string: author, limit: 14 })}</CardAuthor>
          )}
        </Link>
      </CardWrapper>
    </div>
  );
};
