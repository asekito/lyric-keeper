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
import {
  Delete_Lyric_Matching_IdVariables,
  Lyric,
  Delete_Lyric_Matching_Id,
  Delete_Lyric_From_User_ListVariables,
  Delete_Lyric_From_User_List,
} from "Types";
import {
  Mutation_Delete_Lyric_Matching_Id,
  Mutation_Delete_Lyric_From_User_List,
} from "operations";
import { truncate } from "utilities";
import { UseResponsiveCheck, UseCurrentUserReturnShape } from "Hooks";
import { SettingsObj } from "Homepage";
import { AreYouSureDialog } from "./AreYouSureDialog";

type Props = Lyric & {
  getAndUpdateAllLyrics(settings?: SettingsObj): void;
  darkModeIsEnabled: boolean;
  currentUser: UseCurrentUserReturnShape["currentUser"];
  showDeleteButton?: boolean;
};

export const LyricCard: React.FC<Props> = ({
  title,
  author,
  shortUrl,
  id,
  getAndUpdateAllLyrics,
  darkModeIsEnabled,
  currentUser,
  showDeleteButton = false,
}) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [deleteLyric, { loading: mutationLoading }] = useMutation<
    Delete_Lyric_Matching_Id,
    Delete_Lyric_Matching_IdVariables
  >(Mutation_Delete_Lyric_Matching_Id, {
    onCompleted: () => getAndUpdateAllLyrics(),
  });

  const [deleteLyricFromUserList] = useMutation<
    Delete_Lyric_From_User_List,
    Delete_Lyric_From_User_ListVariables
  >(Mutation_Delete_Lyric_From_User_List);

  const { isMobile } = UseResponsiveCheck();

  const limit = isMobile ? 7 : 14;

  if (mutationLoading) return <LoadingIndicator />;

  return (
    <>
      {currentUser && showDeleteButton && (
        <AreYouSureDialog
          lyricTitle={title}
          onClickDelete={() => {
            deleteLyricFromUserList({
              variables: { uid: currentUser.uid, lyricId: id },
            });
            deleteLyric({ variables: { id } });
          }}
          isOpen={dialogIsOpen}
          setIsOpen={setDialogIsOpen}
        />
      )}
      <div style={{ display: "block" }}>
        <CardWrapper darkMode={darkModeIsEnabled}>
          {currentUser && showDeleteButton && (
            <IconButton
              onClick={() => setDialogIsOpen(true)}
              style={{
                display: "inline",
                verticalAlign: "super",
                marginRight: "15px",
                padding: "0px",
                top: "4px",
              }}
            >
              <Delete />
              {mutationLoading && <LoadingIndicator />}
            </IconButton>
          )}
          <Link
            to={`/lyric/${shortUrl}`}
            style={{ display: "inline-block", paddingTop: "8px" }}
          >
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
