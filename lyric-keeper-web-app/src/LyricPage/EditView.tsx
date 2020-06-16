import React from "react";
import { NewLyricForm } from "../NewLyricModal/";
import axios from "axios";

export const EditView: React.FC = ({ setEdit, lyricData, setLyricData }) => {
  const onClickFunction = (title, chorus, verses, author) => {
    axios({
      url: "/updateLyric",
      method: "post",
      data: {
        title,
        chorus,
        verses,
        author,
      },
    }).then(({ data }) => {
      console.log(data);
      setLyricData(data);
    });
    setEdit(false);
  };

  return (
    <NewLyricForm lyricData={lyricData} onClickFunction={onClickFunction} />
  );
};
