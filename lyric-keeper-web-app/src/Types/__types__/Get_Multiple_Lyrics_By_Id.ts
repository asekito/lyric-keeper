/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InputIdObj } from "./globalTypes";

// ====================================================
// GraphQL query operation: Get_Multiple_Lyrics_By_Id
// ====================================================

export interface Get_Multiple_Lyrics_By_Id_getMultipleLyricsById {
  id: string;
  title: string;
  shortUrl: string;
  author: string;
  chorus: string;
  verses: string;
  isPrivate: boolean | null;
}

export interface Get_Multiple_Lyrics_By_Id {
  getMultipleLyricsById: Get_Multiple_Lyrics_By_Id_getMultipleLyricsById[] | null;
}

export interface Get_Multiple_Lyrics_By_IdVariables {
  ids?: (InputIdObj | null)[] | null;
}
