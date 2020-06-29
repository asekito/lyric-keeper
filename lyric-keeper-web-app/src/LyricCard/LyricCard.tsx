import React, { useState } from "react";
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
import { Delete_Lyric_Matching_Short_UrlVariables } from "Types";
import { Mutation_Delete_Lyric_Matching_Short_Url } from "operations";
import { truncate } from "utilities";
import { UseResponsiveCheck } from "Hooks";
import { AreYouSureDialog } from "./AreYouSureDialog";

interface Props {
  title: string;
  author: string;
  shortUrl: string;
  getAndUpdateAllLyrics(): void;
  darkModeIsEnabled: boolean;
}

export const LyricCard: React.FC<Props> = ({
  title,
  author,
  shortUrl,
  getAndUpdateAllLyrics,
  darkModeIsEnabled,
}) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [deleteLyric, { loading }] = useMutation<{
    deleteLyric: Delete_Lyric_Matching_Short_UrlVariables;
  }>(Mutation_Delete_Lyric_Matching_Short_Url, {
    onCompleted: () => getAndUpdateAllLyrics(),
  });

  const { isMobile } = UseResponsiveCheck();

  const limit = isMobile ? 7 : 14;

  if (loading) return <LoadingIndicator />;

  return (
    <>
      <AreYouSureDialog
        onClickDelete={() => deleteLyric({ variables: { shortUrl } })}
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
      <div style={{ display: "block" }}>
        <CardWrapper darkMode={darkModeIsEnabled}>
          <IconButton
            onClick={() => setDialogIsOpen(true)}
            style={{
              display: "inline",
              verticalAlign: "super",
              marginRight: "5px",
            }}
          >
            <Delete />
            {loading && <LoadingIndicator />}
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
    </>
  );
};
