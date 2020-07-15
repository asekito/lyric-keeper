import React, { useState, useEffect } from "react";
import { UseResponsiveCheck, UseDarkMode } from "Hooks";
import { truncate } from "utilities";
import {
  CardWrapper,
  CardTitle,
  TitleAuthorDivider,
  CardAuthor,
} from "./elements";
import Delete from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

interface Props {
  title: string;
  author?: string;
  id: string;
  setSelectedLyrics?: React.Dispatch<any>;
  clearAll?: boolean;
  selectable?: boolean;
  showDeleteIcon?: boolean;
  onClickDelete?({}: { id: string }): void;
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
}) => {
  const [selected, setSelected] = useState(false);
  const { isMobile } = UseResponsiveCheck();
  const { darkModeIsEnabled } = UseDarkMode();

  useEffect(() => {
    setSelected(false);
  }, [clearAll]);

  const limit = isMobile ? 7 : 14;

  return (
    <div style={{ display: "block" }}>
      <CardWrapper
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
        <div style={{ display: "inline-block", paddingTop: "8px" }}>
          {showDeleteIcon && onClickDelete && (
            <IconButton
              onClick={() => onClickDelete({ id })}
              style={{
                display: "inline",
                verticalAlign: "super",
                marginRight: "15px",
                padding: "0px",
                top: "4px",
              }}
            >
              <Delete />
            </IconButton>
          )}
          <CardTitle>{truncate({ string: title, limit })}</CardTitle>
          <TitleAuthorDivider>{" | "}</TitleAuthorDivider>
          {author && (
            <CardAuthor>{truncate({ string: author, limit })}</CardAuthor>
          )}
        </div>
      </CardWrapper>
    </div>
  );
};
