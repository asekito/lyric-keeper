import React, { useEffect } from "react";
import { Songtitle, SongAuthor, SongVerse, SongChorus } from "./elements";
import { Lyric_Without_Short_Url } from "Types";

const ChorusAndVerse = (
  { chorus, verse }: any // @TODO: Fix types
) => (
  <>
    <SongVerse>{verse}</SongVerse>
    <SongChorus>{chorus}</SongChorus>
  </>
);

export const LyricView: React.FC<Lyric_Without_Short_Url> = ({
  title,
  author,
  verses,
  chorus,
}) => {
  useEffect(() => {
    console.log(
      title && author && verses && chorus
        ? "LyricView mounted with data!"
        : "LyricView mounted without data!"
    );
  }, []);
  return (
    <>
      <Songtitle>{title}</Songtitle>
      <SongAuthor>{author}</SongAuthor>
      {verses && chorus && (
        <>
          {verses
            .split("(chorus)")
            .map(
              (item: React.ReactNode, index: number, arr: string | any[]) => {
                if (index < arr.length - 1) {
                  return <ChorusAndVerse chorus={chorus} verse={item} />;
                } else {
                  return <SongVerse>{item}</SongVerse>;
                }
              }
            )}
        </>
      )}
    </>
  );
};
