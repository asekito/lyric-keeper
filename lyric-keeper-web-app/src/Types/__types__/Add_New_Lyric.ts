/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ErrorUnion } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Add_New_Lyric
// ====================================================

export interface Add_New_Lyric_addNewLyric {
  __typename: "Error";
  error: ErrorUnion | null;
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
