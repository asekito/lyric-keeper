/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Get_All_Lyrics
// ====================================================

export interface Get_All_Lyrics_allLyrics {
  __typename: "Lyric";
  title: string;
  shortUrl: string;
  author: string;
  chorus: string;
  verses: string;
}

export interface Get_All_Lyrics {
  allLyrics: Get_All_Lyrics_allLyrics[] | null;
}
