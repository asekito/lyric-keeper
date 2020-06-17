import React from "react";
import {
  CardWrapper,
  CardTitle,
  CardAuthor,
  TitleAuthorDivider,
} from "./elements";
import { Delete } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
// import axios from "axios";
import { Link } from "../GlobalComponents";

interface Props {
  title: string;
  author: string;
  shortUrl: string;
  getAndUpdateAllLyrics: any; // @TODO: Fix types
}

export const LyricCard: React.FC<Props> = ({
  title,
  author,
  shortUrl,
  getAndUpdateAllLyrics,
}) => {
  const deleteLyric = (shortUrl: string) => {
    // axios({
    //   method: "post",
    //   url: "/deleteLyric",
    //   data: {
    //     shortUrl: shortUrl,
    //   },
    // }).then(() => getAndUpdateAllLyrics());
    return [];
  };

  return (
    <div style={{ display: "block" }}>
      <IconButton
        onClick={() => deleteLyric(shortUrl)}
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
