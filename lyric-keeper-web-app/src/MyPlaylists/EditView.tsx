import React, { useState, useEffect } from "react";
import { Lyric, Edit_Playlist, Edit_PlaylistVariables } from "Types";
import { StyledTextField } from "GlobalComponents";
import { UseDarkMode, UseCurrentUser } from "Hooks";
import { DraggableLyricCard } from "./DraggableLyricCard";
import Container from "@material-ui/core/Container";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { NewLyricControlButton } from "./elements";
import Save from "@material-ui/icons/Save";
import { useMutation } from "react-apollo";
import { Mutation_Edit_Playlist } from "operations";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { NewLyricsSelectorModal } from "./NewLyricsSelectorModal";

interface Props {
  lyricList: Lyric[];
  playlistName: string;
  playlistId: string;
  refetchAllData(cb?: any): void;
}

export const EditView: React.FC<Props> = ({
  lyricList,
  playlistName,
  playlistId,
  refetchAllData,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newSelectedLyrics, setNewSelectedLyrics] = useState<any[]>([]);
  const [lyricsIndex, setLyricsIndex] = useState<{ [key: string]: Lyric }>({});
  const [lyricIdList, setLyricIdList] = useState<string[]>([]);
  const [textFieldText, setTextFieldText] = useState(playlistName);
  const { darkModeIsEnabled } = UseDarkMode();
  const { currentUser } = UseCurrentUser();

  const [editPlaylist] = useMutation<Edit_Playlist, Edit_PlaylistVariables>(
    Mutation_Edit_Playlist
  );

  useEffect(() => {
    const index: any = {};
    lyricList.forEach(({ ...lyricData }) => {
      index[lyricData.id] = { ...lyricData };
    });
    setLyricsIndex(index);
    setLyricIdList(lyricList.map(({ id }) => id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle persistance of drag 'n drop data
  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    // If the user dropped the lyric back in its original place, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newLyricIdList = [...lyricIdList];
    newLyricIdList.splice(source.index, 1);
    newLyricIdList.splice(destination.index, 0, draggableId);
    setLyricIdList(newLyricIdList);
  };

  const updatePlaylistAndRefetchData = async () => {
    currentUser &&
      (await editPlaylist({
        variables: {
          uid: currentUser?.uid,
          playlistName: textFieldText,
          lyricList: lyricIdList.map(id => ({ lyricId: id })),
          playlistId,
        },
      }));
    refetchAllData();
  };

  const deleteIdFromList = ({ id }: { id: string }) => {
    setLyricIdList(data => data.filter(lyricId => lyricId !== id));
  };

  return (
    <>
      <NewLyricsSelectorModal
        lyricIdList={lyricIdList}
        setLyricIdList={setLyricIdList}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        selectedLyrics={newSelectedLyrics}
        setSelectedLyrics={setNewSelectedLyrics}
      />
      {currentUser && lyricIdList && (
        <NewLyricControlButton
          style={{ marginBottom: "10px" }}
          variant="contained"
          onClick={async () => {
            await updatePlaylistAndRefetchData();
            updatePlaylistAndRefetchData();
          }}
        >
          <Save /> Save
        </NewLyricControlButton>
      )}
      <NewLyricControlButton
        style={{ marginBottom: "10px" }}
        variant="contained"
        onClick={() => setModalIsOpen(true)}
      >
        <AddBoxIcon /> Add Lyrics to List
      </NewLyricControlButton>
      <div>
        <StyledTextField
          style={{ marginTop: "30px", width: "300px", marginBottom: "30px" }}
          label="Enter the playlist name here"
          name="playlist-name"
          variant="outlined"
          darkMode={darkModeIsEnabled}
          value={textFieldText}
          onChange={({ target: { value } }) => setTextFieldText(value)}
        />
      </div>
      <Container maxWidth="sm">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="edit-section">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {lyricIdList.map((id, index) => (
                  <div key={id}>
                    <Draggable draggableId={id} index={index}>
                      {draggableProvided => (
                        <div
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          ref={draggableProvided.innerRef}
                        >
                          <DraggableLyricCard
                            showDeleteIcon
                            onClickDelete={deleteIdFromList}
                            selectable={false}
                            key={lyricsIndex[id].id}
                            {...lyricsIndex[id]}
                          />
                        </div>
                      )}
                    </Draggable>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </>
  );
};
