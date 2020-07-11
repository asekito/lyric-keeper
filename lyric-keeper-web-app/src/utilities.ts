import { Lyric } from "Types";

export const truncate = ({
  string,
  limit,
}: {
  string: string;
  limit: number;
}) => `${string.slice(0, limit)}${string.length > limit ? "..." : ""}`;

type findNonPrivateLyricsType = (lyrics: Lyric[]) => Lyric[];

export const findNonPrivateLyrics: findNonPrivateLyricsType = (
  lyrics: Lyric[]
) => lyrics.filter(({ isPrivate }) => isPrivate === null || false);
