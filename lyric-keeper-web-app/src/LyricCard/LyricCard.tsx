import React from "react";
import {
  CardWrapper,
  CardTitle,
  CardAuthor,
  TitleAuthorDivider,
} from "./elements";
import { Delete } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { Link } from "../GlobalComponents";
import { useMutation } from "react-apollo";
import { Delete_Lyric_Matching_Short_UrlVariables } from "Types";
import { Mutation_Delete_Lyric_Matching_Short_Url } from "operations";

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
  const [deleteLyric] = useMutation<{
    deleteLyric: Delete_Lyric_Matching_Short_UrlVariables;
  }>(Mutation_Delete_Lyric_Matching_Short_Url, {
    onCompleted: () => getAndUpdateAllLyrics(),
  });

  return (
    <div style={{ display: "block" }}>
      <IconButton
        onClick={() => deleteLyric({ variables: { shortUrl } })}
        style={{
          display: "inline",
          verticalAlign: "super",
          marginRight: "5px",
        }}
      >
        <Delete />
      </IconButton>
      <Link to={`/lyric/${shortUrl}`} style={{ display: "inline-block" }}>
        <CardWrapper>
          <CardTitle>{title}</CardTitle>
          <TitleAuthorDivider>{" | "}</TitleAuthorDivider>
          {author && <CardAuthor>{author}</CardAuthor>}
        </CardWrapper>
      </Link>
    </div>
  );
};
