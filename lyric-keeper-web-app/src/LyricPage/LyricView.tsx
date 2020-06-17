import React from "react";
import { Songtitle, SongAuthor, SongVerse, SongChorus } from "./elements";
import { Lyric_Without_Short_Url } from "Types";

const ChorusAndVerse = (
  { chorus, verse }: any // @TODO: Fix types
) => (
  <>
    <SongVerse>{verse}</SongVerse>
    <SongChorus>{chorus}</SongChorus>
    {console.log(`**ChorusAndVerse**: `, verse, chorus)}
  </>
);

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
              return (
                <ChorusAndVerse key={index} chorus={chorus} verse={item} />
              );
            } else {
              console.log(`**SongVerse**: `, item);
              return item?.length ? (
                <SongVerse key={index}>{item}</SongVerse>
              ) : null;
            }
          })}
      </>
    )}
  </>
);
