/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Add_New_Lyric
// ====================================================

export interface Add_New_Lyric_addNewLyric_result {
  __typename: "Error";
  error: string | null;
}

export interface Add_New_Lyric_addNewLyric {
  __typename: "AddNewLyricResult";
  result: Add_New_Lyric_addNewLyric_result | null;
}

export interface Add_New_Lyric {
  addNewLyric: Add_New_Lyric_addNewLyric | null;
}

export interface Add_New_LyricVariables {
  title: string;
  author: string;
  chorus: string;
  verses: string;
}