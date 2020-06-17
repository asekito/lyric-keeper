import { gql } from "apollo-boost";

export const Lyric = gql`
  fragment Lyric on Lyric {
    title
    shortUrl
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
      error
    }
  }
`;

export const Mutation_Delete_Lyric_Matching_Short_Url = gql`
  mutation Delete_Lyric_Matching_Short_Url($shortUrl: String!) {
    deleteLyricMatchingShortUrl(input: { shortUrl: $shortUrl })
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
      ...Lyric
    }
  }
  ${Lyric}
`;
