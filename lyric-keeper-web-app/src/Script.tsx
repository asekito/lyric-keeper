import React, { useEffect } from "react";
import { useMutation } from "react-apollo";
import { Add_New_LyricVariables } from "Types";
import { Mutation_Add_New_Lyric } from "operations";

const data: any[] = [];

export const Script = () => {
  const [addNewLyric] = useMutation<{ addNewLyric: Add_New_LyricVariables }>(
    Mutation_Add_New_Lyric
  );

  useEffect(() => {
    data.forEach(({ title, chorus, verses, author, shortUrl }) => {
      addNewLyric({ variables: { title, chorus, verses, author, shortUrl } });
      console.log(`${title} added!`);
    });
  }, []);

  return <></>;
};
