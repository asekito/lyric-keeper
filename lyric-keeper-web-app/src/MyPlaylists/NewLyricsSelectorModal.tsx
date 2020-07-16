import React, { useState, useEffect } from "react";
import {
  NewPlaylistDescriptiveText,
  MainAreaWrapper,
  NewLyricControlButton,
  StyledModal,
} from "./elements";
import {
  Get_All_Lyrics_Title_And_Author,
  Get_All_Lyrics_Title_And_Author_allLyrics,
} from "Types";
import { UseIsOffline, UseDarkMode } from "Hooks";
import { useQuery } from "react-apollo";
import { Query_Get_All_Lyrics_Title_And_Author } from "operations";
import { findNonPrivateLyrics } from "utilities";
import { LyricCountWrapper, ModalContentWrapper } from "GlobalComponents";
import { DraggableLyricCard } from "./DraggableLyricCard";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

interface Props {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<boolean>;
  lyricIdList: string[];
  setLyricIdList: React.Dispatch<string[]>;
}

export const NewLyricsSelectorModal: React.FC<Props> = ({
  modalIsOpen,
  setModalIsOpen,
  lyricIdList,
  setLyricIdList,
}) => {
  const [selectedLyrics, setSelectedLyrics] = useState<any[]>([]);
  const [clearAll, setClearAll] = useState(false);
  const [allLyrics, setAllLyrics] = useState<
    Get_All_Lyrics_Title_And_Author["allLyrics"]
  >([]);
  const { isOffline } = UseIsOffline();
  const { darkModeIsEnabled } = UseDarkMode();

  const { data, loading } = useQuery<Get_All_Lyrics_Title_And_Author>(
    Query_Get_All_Lyrics_Title_And_Author,
    { skip: isOffline }
  );
  useEffect(() => {
    if (data && data.allLyrics && !loading) {
      const nonPrivateData = findNonPrivateLyrics<
        Get_All_Lyrics_Title_And_Author_allLyrics
      >(data.allLyrics);

      if (nonPrivateData) {
        setAllLyrics(
          nonPrivateData.filter(({ id }) => !lyricIdList.includes(id))
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  const addNewLyricsToList = () => {
    setLyricIdList([...lyricIdList, ...Object.keys(selectedLyrics)]);
    setModalIsOpen(false);
  };

  return (
    <StyledModal onClose={() => setModalIsOpen(false)} open={modalIsOpen}>
      <ModalContentWrapper darkMode={darkModeIsEnabled}>
        <NewPlaylistDescriptiveText>
          Select the lyric(s) you'd like to add to your playlist
          <br />
          <div style={{ fontSize: "0.9rem", marginTop: "10px" }}>
            Currently, private lyrics cannot be added to a playlist. I'm working
            on this, though!
          </div>
        </NewPlaylistDescriptiveText>
        <NewLyricControlButton
          variant="contained"
          onClick={() => {
            setSelectedLyrics([]);
            setClearAll(!clearAll);
          }}
        >
          Clear selection <ClearAllIcon />
        </NewLyricControlButton>
        <NewLyricControlButton
          variant="contained"
          onClick={() => {
            addNewLyricsToList();
          }}
        >
          Done <CheckCircleIcon />
        </NewLyricControlButton>
        <MainAreaWrapper maxWidth="sm">
          <LyricCountWrapper darkMode={darkModeIsEnabled}>{`Lyrics selected: ${
            Object.keys(selectedLyrics).length
          }`}</LyricCountWrapper>
          <>
            {allLyrics?.map(({ title, author, id }) => (
              <DraggableLyricCard
                clearAll={clearAll}
                setSelectedLyrics={setSelectedLyrics}
                id={id}
                title={title}
                author={author}
              />
            ))}
          </>
        </MainAreaWrapper>
      </ModalContentWrapper>
    </StyledModal>
  );
};
