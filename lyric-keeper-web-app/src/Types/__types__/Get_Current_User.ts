/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Get_Current_User
// ====================================================

export interface Get_Current_User_getCurrentUser_lyrics {
  lyricId: string;
}

export interface Get_Current_User_getCurrentUser_playlists_lyricList {
  lyricId: string;
}

export interface Get_Current_User_getCurrentUser_playlists {
  id: string;
  playlistName: string;
  lyricList: (Get_Current_User_getCurrentUser_playlists_lyricList | null)[];
}

export interface Get_Current_User_getCurrentUser {
  lyrics: (Get_Current_User_getCurrentUser_lyrics | null)[];
  playlists: (Get_Current_User_getCurrentUser_playlists | null)[] | null;
}

export interface Get_Current_User {
  getCurrentUser: Get_Current_User_getCurrentUser | null;
}

export interface Get_Current_UserVariables {
  uid: string;
}
