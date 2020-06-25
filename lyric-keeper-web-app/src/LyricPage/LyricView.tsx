import React from "react";
import { Songtitle, SongAuthor, SongVerse, SongChorus } from "./elements";
import { Lyric_Without_Short_Url } from "Types";

export const LyricView: React.FC<
  Lyric_Without_Short_Url & { darkModeIsEnabled: boolean }
> = ({ title, author, verses, chorus, darkModeIsEnabled }) => (
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
                  <SongVerse darkMode={darkModeIsEnabled}>{item}</SongVerse>
                  <SongChorus darkMode={darkModeIsEnabled}>{chorus}</SongChorus>
                </>
              );
            } else {
              return (
                <SongVerse darkMode={darkModeIsEnabled} key={index}>
                  {item}
                </SongVerse>
              );
            }
          })}
      </>
    )}
  </>
);
