import { gql } from "apollo-boost";

export const Lyric = gql`
  fragment Lyric on Lyric {
    id
    title
    shortUrl
    author
    chorus
    verses
  }
`;

export const Lyric_Without_Short_Url = gql`
  fragment Lyric_Without_Short_Url on LyricWithoutShortUrl {
    id
    title
    author
    chorus
    verses
  }
`;

export const Query_Get_All_Lyrics = gql`
  query Get_All_Lyrics {
    allLyrics {
      ...Lyric
    }
  }
  ${Lyric}
`;

export const Query_Find_Lyric_With_Short_Url = gql`
  query Find_Lyric_With_Short_Url($shortUrl: String!) {
    findLyricWithShortUrl(input: { shortUrl: $shortUrl }) {
      ...Lyric
    }
  }
  ${Lyric}
`;

export const Mutation_Add_New_Lyric = gql`
  mutation Add_New_Lyric(
    $title: String!
    $author: String!
    $chorus: String!
    $verses: String!
  ) {
    addNewLyric(
      input: {
        title: $title
        author: $author
        chorus: $chorus
        verses: $verses
      }
    ) {
      id
    }
  }
`;

export const Mutation_Delete_Lyric_Matching_Id = gql`
  mutation Delete_Lyric_Matching_Id($id: String!) {
    deleteLyricMatchingId(input: { id: $id })
  }
`;

export const Mutation_Update_Lyric = gql`
  mutation Update_Lyric(
    $title: String!
    $author: String!
    $chorus: String!
    $verses: String!
  ) {
    updateLyric(
      input: {
        title: $title
        author: $author
        chorus: $chorus
        verses: $verses
      }
    ) {
      ...Lyric_Without_Short_Url
    }
  }
  ${Lyric_Without_Short_Url}
`;

export const Query_Get_Current_User = gql`
  query Get_Current_User($uid: String!) {
    getCurrentUser(input: { uid: $uid }) {
      lyricId
    }
  }
`;

export const Mutation_Add_New_Lyric_To_User_List = gql`
  mutation Add_New_Lyric_To_User_List($uid: String!, $lyricId: String!) {
    addNewLyricToUserList(input: { uid: $uid, lyricId: $lyricId }) {
      id
    }
  }
`;

export const Mutation_Delete_Lyric_From_User_List = gql`
  mutation Delete_Lyric_From_User_List($uid: String!, $lyricId: String!) {
    deleteLyricFromUserList(input: { uid: $uid, lyricId: $lyricId })
  }
`;

export const Query_Get_Multiple_Lyrics_By_Id = gql`
  query Get_Multiple_Lyrics_By_Id($ids: [InputIdObj]) {
    getMultipleLyricsById(input: { ids: $ids }) {
      ...Lyric
    }
  }
  ${Lyric}
`;
