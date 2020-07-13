/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Create_New_Playlist
// ====================================================

export interface Create_New_Playlist_createNewPlaylist_result {
  error: boolean;
}

export interface Create_New_Playlist_createNewPlaylist {
  result: Create_New_Playlist_createNewPlaylist_result;
}

export interface Create_New_Playlist {
  createNewPlaylist: Create_New_Playlist_createNewPlaylist;
}

export interface Create_New_PlaylistVariables {
  uid: string;
  playlistName: string;
  lyricList: (string | null)[];
}
