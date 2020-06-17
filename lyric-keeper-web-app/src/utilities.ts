export const truncate = ({
  string,
  limit,
}: {
  string: string;
  limit: number;
}) => `${string.slice(0, limit)}${string.length > limit ? "..." : ""}`;
