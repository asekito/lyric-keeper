/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InputIdObj } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Edit_Playlist
// ====================================================

export interface Edit_Playlist {
  editPlaylist: number | null;
}

export interface Edit_PlaylistVariables {
  playlistId: string;
  playlistName: string;
  lyricList: (InputIdObj | null)[];
  uid: string;
}
