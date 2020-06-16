import React from 'react';
import { Songtitle, SongAuthor, SongVerse, SongChorus } from './elements';

const ChorusAndVerse = ({ chorus, verse }) => (
  <>
    <SongVerse>{verse}</SongVerse>
    <SongChorus>{chorus}</SongChorus>
  </>
);

export const LyricView: React.FC = ({ title, author, verses, chorus }) => (
  <>
    <Songtitle>{title}</Songtitle>
    <SongAuthor>{author}</SongAuthor>
    {verses && chorus && (
      <>
        {verses.split('(chorus)').map((item, index, arr) => {
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
