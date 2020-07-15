import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import {
  NewPlaylistDescriptiveText,
  MainAreaWrapper,
  NewLyricControlButton,
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

interface Props {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<boolean>;
  selectedLyrics: any[];
  setSelectedLyrics: React.Dispatch<any[]>;
  lyricIdList: string[];
  setLyricIdList: React.Dispatch<string[]>;
}

export const NewLyricsSelectorModal: React.FC<Props> = ({
  modalIsOpen,
  setModalIsOpen,
  selectedLyrics,
  setSelectedLyrics,
  lyricIdList,
  setLyricIdList,
}) => {
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
  }, [data, loading]);

  return (
    <Modal onClose={() => setModalIsOpen(false)} open={modalIsOpen}>
      <ModalContentWrapper darkMode={darkModeIsEnabled}>
        <NewPlaylistDescriptiveText>
          Select the lyric(s) you'd like to add to your playlist
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
    </Modal>
  );
};
