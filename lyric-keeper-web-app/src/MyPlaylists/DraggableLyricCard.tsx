import React, { useState, useEffect } from "react";
import { UseResponsiveCheck, UseDarkMode } from "Hooks";
import { truncate } from "utilities";
import {
  CardWrapper,
  CardTitle,
  TitleAuthorDivider,
  CardAuthor,
} from "./elements";

interface Props {
  title: string;
  author?: string;
  id: string;
  setSelectedLyrics: React.Dispatch<any>;
  clearAll: boolean;
}

export const DraggableLyricCard: React.FC<Props> = ({
  title,
  author,
  id,
  clearAll,
  setSelectedLyrics,
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
        onClick={() => {
          setSelectedLyrics(({ ...selectedLyricsObj }) => {
            const returnObj = { ...selectedLyricsObj };
            setSelected(!returnObj[id]);
            if (returnObj[id] === (true || false))
              returnObj[id] = !returnObj[id];
            else returnObj[id] = true;
            return returnObj;
          });
        }}
        darkMode={darkModeIsEnabled}
        isSelected={selected}
      >
        <div style={{ display: "inline-block", paddingTop: "8px" }}>
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
