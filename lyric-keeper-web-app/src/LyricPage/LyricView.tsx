import React from "react";
import { Songtitle, SongAuthor, SongVerse, SongChorus } from "./elements";
import { Lyric_Without_Short_Url } from "Types";

export const LyricView: React.FC<Lyric_Without_Short_Url> = ({
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
        {console.log(`**Verses split by chorus: `, verses.split("(chorus)"))}
        {verses
          .split("(chorus)")
          .map((item: any, index: number, arr: string | any[]) => {
            if (index < arr.length - 1) {
              console.log(
                "Is not at end of arr",
                `**Verse:** ${item} \n**Chorus:** ${chorus}`
              );
              return (
                <>
                  <SongVerse>{item}</SongVerse>
                  <SongChorus>{chorus}</SongChorus>
                </>
              );
            } else {
              console.log(`**SongVerse**: `, item);
              return <SongVerse key={index}>{item}</SongVerse>;
            }
          })}
      </>
    )}
  </>
);
