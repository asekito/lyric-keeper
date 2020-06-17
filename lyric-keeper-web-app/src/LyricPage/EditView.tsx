import React from "react";
import { NewLyricForm } from "../NewLyricModal/";
import { Lyric, Update_LyricVariables } from "Types";
import { useMutation } from "react-apollo";
import { Mutation_Update_Lyric } from "operations";

interface Props {
  lyricData: Lyric | null;
  setEdit(editStatus: boolean): void;
  refetch?: () => void;
}

export const EditView: React.FC<Props> = ({ setEdit, lyricData, refetch }) => {
  const [updateLyric] = useMutation<{ updateLyric: Update_LyricVariables }>(
    Mutation_Update_Lyric
  );

  const onClickFunction = (item: Lyric) => {
    updateLyric({ variables: item });
    setEdit(false);
    refetch && refetch();
  };

  return (
    lyricData && (
      <NewLyricForm lyricData={lyricData} onClickFunction={onClickFunction} />
    )
  );
};
