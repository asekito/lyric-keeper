import React from "react";
import { NewLyricForm } from "../NewLyricModal/";
// import axios from "axios";

export const EditView: React.FC<any> = ({
  setEdit,
  lyricData,
  setLyricData,
}) => {
  // @TODO: Fix types
  const onClickFunction: any = (
    title: any,
    chorus: any,
    verses: any,
    author: any
  ) => {
    // @TODO: Fix types
    // axios({
    //   url: "/updateLyric",
    //   method: "post",
    //   data: {
    //     title,
    //     chorus,
    //     verses,
    //     author,
    //   },
    // }).then(({ data }) => {
    //   console.log(data);
    //   setLyricData(data);
    // });
    setLyricData([]);
    setEdit(false);
  };

  return (
    <NewLyricForm lyricData={lyricData} onClickFunction={onClickFunction} />
  );
};  
