export const truncate = ({
  string,
  limit,
}: {
  string: string;
  limit: number;
}) => `${string.slice(0, limit)}${string.length > limit ? "..." : ""}`;

export const findNonPrivateLyrics = <I>(lyrics: I[]): I[] | undefined => {
  if (lyrics)
    return lyrics.filter((item: any) => item?.isPrivate === (null || false));
  return undefined;
};
