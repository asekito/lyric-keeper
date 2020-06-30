import React, { useEffect } from "react";
import { useMutation } from "react-apollo";
import {
  Add_New_Lyric_To_User_List_addNewLyricToUserList,
  Add_New_Lyric_To_User_ListVariables,
} from "Types";
import { Mutation_Add_New_Lyric_To_User_List } from "operations";
import { UseCurrentUser } from "Hooks";

const data: any[] = [];

export const Script = () => {
  const { currentUser } = UseCurrentUser();

  const [addNewLyricToUserList] = useMutation<
    Add_New_Lyric_To_User_List_addNewLyricToUserList,
    Add_New_Lyric_To_User_ListVariables
  >(Mutation_Add_New_Lyric_To_User_List);

  useEffect(() => {
    currentUser &&
      data.forEach(({ id, title }) => {
        // addNewLyric({ variables: { title, chorus, verses, author, shortUrl } });
        addNewLyricToUserList({
          variables: { uid: currentUser?.uid, lyricId: id },
        });
        console.log(`${title} added!`);
      });
  }, []);

  return <></>;
};
