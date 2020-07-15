import { Lyric } from "Types";

export const truncate = ({
  string,
  limit,
}: {
  string: string;
  limit: number;
}) => `${string.slice(0, limit)}${string.length > limit ? "..." : ""}`;

export const findNonPrivateLyrics = <I>(lyrics: I[]): I[] | undefined => {
  if (lyrics)
    return lyrics.filter(
      (item: any) => item?.isPrivate === null || item?.isPrivate === false
    );
  return undefined;
};

interface OrderLyricsArgShape<I> {
  fullLyricData: I[];
  lyricIdList: { lyricId: string }[];
}

// Using generics to allow for possible type expansion in the future
export const orderLyricsBasedOnIdList = <I extends Lyric>({
  fullLyricData,
  lyricIdList,
}: OrderLyricsArgShape<I>): I[] => {
  const index: { [key: string]: I } = {};
  const returnArr: I[] = [];

  fullLyricData.forEach(({ ...lyricData }) => {
    index[lyricData.id] = { ...lyricData };
  });

  lyricIdList.forEach(({ lyricId }) => {
    if (index[lyricId]) returnArr.push({ ...index[lyricId] });
  });

  return returnArr;
};
