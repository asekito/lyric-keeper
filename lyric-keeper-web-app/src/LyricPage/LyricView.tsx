import React from "react";
import { Songtitle, SongAuthor, SongVerse, SongChorus } from "./elements";
import { Lyric_Without_Short_Url } from "Types";

export const LyricView: React.FC<Omit<Lyric_Without_Short_Url, "id">> = ({
  title,
  author,
  verses,
  chorus,
}) => (
  <>
    <Songtitle>{title}</Songtitle>
    <SongAuthor>{author}</SongAuthor>
    {verses && chorus && (
      <>
        {verses
          .split("(chorus)")
          .map((item: any, index: number, arr: string | any[]) => {
            if (index < arr.length - 1) {
              return (
                <>
                  <SongVerse>{item}</SongVerse>
                  <SongChorus>{chorus}</SongChorus>
                </>
              );
            } else {
              return <SongVerse key={index}>{item}</SongVerse>;
            }
          })}
      </>
    )}
  </>
);
