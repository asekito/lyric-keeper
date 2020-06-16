import React from "react";
import { Songtitle, SongAuthor, SongVerse, SongChorus } from "./elements";

const ChorusAndVerse = (
  { chorus, verse }: any // @TODO: Fix types
) => (
  <>
    <SongVerse>{verse}</SongVerse>
    <SongChorus>{chorus}</SongChorus>
  </>
);

export const LyricView: React.FC<any> = (
  { title, author, verses, chorus } // @TODO: Fix types
) => (
  <>
    <Songtitle>{title}</Songtitle>
    <SongAuthor>{author}</SongAuthor>
    {verses && chorus && (
      <>
        {verses
          .split("(chorus)")
          .map((item: React.ReactNode, index: number, arr: string | any[]) => {
            if (index < arr.length - 1) {
              return <ChorusAndVerse chorus={chorus} verse={item} />;
            } else {
              return <SongVerse>{item}</SongVerse>;
            }
          })}
      </>
    )}
  </>
);
