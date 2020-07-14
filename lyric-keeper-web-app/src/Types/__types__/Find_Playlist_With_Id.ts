/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Find_Playlist_With_Id
// ====================================================

export interface Find_Playlist_With_Id_findPlaylistWithId_lyricList {
  lyricId: string;
}

export interface Find_Playlist_With_Id_findPlaylistWithId {
  id: string;
  playlistName: string;
  lyricList: (Find_Playlist_With_Id_findPlaylistWithId_lyricList | null)[];
}

export interface Find_Playlist_With_Id {
  findPlaylistWithId: Find_Playlist_With_Id_findPlaylistWithId;
}

export interface Find_Playlist_With_IdVariables {
  uid: string;
  playlistId: string;
}
