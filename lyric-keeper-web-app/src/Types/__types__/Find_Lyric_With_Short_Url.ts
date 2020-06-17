/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Find_Lyric_With_Short_Url
// ====================================================

export interface Find_Lyric_With_Short_Url_findLyricWithShortUrl {
  title: string;
  shortUrl: string;
  author: string;
  chorus: string;
  verses: string;
}

export interface Find_Lyric_With_Short_Url {
  findLyricWithShortUrl: Find_Lyric_With_Short_Url_findLyricWithShortUrl[] | null;
}

export interface Find_Lyric_With_Short_UrlVariables {
  shortUrl: string;
}
