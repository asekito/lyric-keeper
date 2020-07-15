import React, { useState, useEffect } from "react";
import { Lyric } from "Types";
import { StyledTextField } from "GlobalComponents";
import { UseDarkMode } from "Hooks";
import { DraggableLyricCard } from "./DraggableLyricCard";
import Container from "@material-ui/core/Container";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
  lyricList: Lyric[];
  playlistName: string;
}

export const EditView: React.FC<Props> = ({ lyricList, playlistName }) => {
  const [lyricsIndex, setLyricsIndex] = useState<{ [key: string]: Lyric }>({});
  const [lyricIdList, setLyricIdList] = useState<string[]>([]);
  const [textFieldText, setTextFieldText] = useState(playlistName);
  const { darkModeIsEnabled } = UseDarkMode();

  useEffect(() => {
    const index: any = {};
    lyricList.forEach(({ ...lyricData }) => {
      index[lyricData.id] = { ...lyricData };
    });
    setLyricsIndex(index);
    setLyricIdList(lyricList.map(({ id }) => id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <>
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
