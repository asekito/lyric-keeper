/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Update_Lyric
// ====================================================

export interface Update_Lyric_updateLyric {
  id: string;
  title: string;
  author: string;
  chorus: string;
  verses: string;
  isPrivate: boolean | null;
}

export interface Update_Lyric {
  updateLyric: Update_Lyric_updateLyric;
}

export interface Update_LyricVariables {
  title: string;
  author: string;
  chorus: string;
  verses: string;
}
