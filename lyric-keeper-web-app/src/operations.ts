import { gql } from "apollo-boost";

export const Query_Get_All_Lyrics = gql`
  query Query_Get_All_Lyrics {
    allLyrics {
      title
      shortUrl
      author
      chorus
      verses
    }
  }
`;
