import React from "react";
import {
  CardWrapper,
  CardTitle,
  CardAuthor,
  TitleAuthorDivider,
} from "./elements";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { Link, LoadingIndicator } from "GlobalComponents";
import { useMutation } from "react-apollo";
import {
  Delete_Lyric_Matching_IdVariables,
  Lyric,
  Delete_Lyric_Matching_Id,
} from "Types";
import { Mutation_Delete_Lyric_Matching_Id } from "operations";
import { truncate } from "utilities";
import { UseResponsiveCheck } from "Hooks";
import { SettingsObj } from "Homepage";

type Props = Lyric & {
  getAndUpdateAllLyrics(settings?: SettingsObj): void;
  darkModeIsEnabled: boolean;
};

export const LyricCard: React.FC<Props> = ({
  title,
  author,
  shortUrl,
  id,
  getAndUpdateAllLyrics,
  darkModeIsEnabled,
}) => {
  const [deleteLyric, { loading: mutationLoading }] = useMutation<
    Delete_Lyric_Matching_Id,
    Delete_Lyric_Matching_IdVariables
  >(Mutation_Delete_Lyric_Matching_Id, {
    onCompleted: () => getAndUpdateAllLyrics({ refetchLyrics: true }),
  });

  const { isMobile } = UseResponsiveCheck();

  const limit = isMobile ? 7 : 14;

  if (mutationLoading) return <LoadingIndicator />;

  return (
    <div style={{ display: "block" }}>
      <CardWrapper darkMode={darkModeIsEnabled}>
        <IconButton
          onClick={() => deleteLyric({ variables: { id } })}
          style={{
            display: "inline",
            verticalAlign: "super",
            marginRight: "5px",
          }}
        >
          <Delete />
          {mutationLoading && <LoadingIndicator />}
        </IconButton>
        <Link to={`/lyric/${shortUrl}`} style={{ display: "inline-block" }}>
          <CardTitle>{truncate({ string: title, limit })}</CardTitle>
          <TitleAuthorDivider>{" | "}</TitleAuthorDivider>
          {author && (
            <CardAuthor>{truncate({ string: author, limit })}</CardAuthor>
          )}
        </Link>
      </CardWrapper>
    </div>
  );
};
