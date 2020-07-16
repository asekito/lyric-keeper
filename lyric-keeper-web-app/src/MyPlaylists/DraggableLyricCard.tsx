import React, { useState, useEffect } from "react";
import { UseResponsiveCheck, UseDarkMode } from "Hooks";
import { truncate } from "utilities";
import {
  CardWrapper,
  CardTitle,
  TitleAuthorDivider,
  CardAuthor,
} from "./elements";
import { AreYouSureDialog } from "GlobalComponents";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DragHandleIcon from "@material-ui/icons/DragHandle";

interface Props {
  title: string;
  author?: string;
  id: string;
  setSelectedLyrics?: React.Dispatch<any>;
  clearAll?: boolean;
  selectable?: boolean;
  showDeleteIcon?: boolean;
  onClickDelete?({ id }: { id: string }): void;
  draggable?: boolean;
}

export const DraggableLyricCard: React.FC<Props> = ({
  title,
  author,
  id,
  clearAll,
  setSelectedLyrics,
  selectable = true,
  showDeleteIcon = false,
  onClickDelete,
  draggable = false,
}) => {
  const [showAreYouSureDialog, setShowAreYouSureDialog] = useState(false);
  const [selected, setSelected] = useState(false);
  const { isMobile } = UseResponsiveCheck();
  const { darkModeIsEnabled } = UseDarkMode();

  useEffect(() => {
    setSelected(false);
  }, [clearAll]);

  const limit = isMobile ? 12 : 21;

  return (
    <div style={{ display: "block" }}>
      {showAreYouSureDialog && onClickDelete && (
        <AreYouSureDialog
          entryTitle={title}
          onClickDelete={() => onClickDelete({ id })}
          isOpen={showAreYouSureDialog}
          setIsOpen={setShowAreYouSureDialog}
          confirmationText="Do you want to delete this lyric from your playlist: "
        />
      )}
      <CardWrapper
        draggable={draggable}
        onClick={
          selectable && setSelectedLyrics
            ? () => {
                setSelectedLyrics(({ ...selectedLyricsObj }) => {
                  const returnObj = { ...selectedLyricsObj };
                  if (returnObj[id] === true) {
                    setSelected(false);
                    delete returnObj[id];
                  } else {
                    returnObj[id] = true;
                    setSelected(true);
                  }
                  return returnObj;
                });
              }
            : () => null
        }
        darkMode={darkModeIsEnabled}
        isSelected={selected}
      >
        <div style={{ display: "inline-block" }}>
          {draggable && (
            <DragHandleIcon
              style={{
                height: "30px",
                marginRight: "60px",
                top: "14px",
                position: "relative",
              }}
            />
          )}
          <CardTitle>{truncate({ string: title, limit })}</CardTitle>
          {/* <TitleAuthorDivider>{" | "}</TitleAuthorDivider> */}
          {showDeleteIcon && onClickDelete && (
            <IconButton
              onClick={() => setShowAreYouSureDialog(true)}
              style={{
                display: "inline",
                verticalAlign: "super",
                marginLeft: "60px",
                padding: "0px",
                top: "18px",
              }}
            >
              <Delete />
            </IconButton>
          )}
          {author && (
            <CardAuthor style={{ display: "block" }}>
              {truncate({ string: author, limit })}
            </CardAuthor>
          )}
        </div>
      </CardWrapper>
    </div>
  );
};
