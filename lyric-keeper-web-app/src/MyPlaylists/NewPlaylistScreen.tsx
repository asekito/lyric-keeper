import React, { useEffect, useState } from "react";
import { Navbar, PageWrapper, PageHeader, Link } from "GlobalComponents";
import { UseDarkMode } from "Hooks";
import { NewPlaylistButton } from "./elements";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useQuery } from "react-apollo";
import { Query_Get_All_Lyrics } from "operations";
import { Get_All_Lyrics } from "Types";

export const NewPlaylistScreen: React.FC = () => {
  const [allLyrics, setAllLyrics] = useState([]);
  const { darkModeIsEnabled } = UseDarkMode();

  const { data, loading, refetch } = useQuery<Get_All_Lyrics>(
    Query_Get_All_Lyrics
  );

  return (
    <>
      <Navbar />
      <PageWrapper isDarkMode={darkModeIsEnabled}>
        <PageHeader variant="h4">New Playlist</PageHeader>
        <Link to="/my-playlists">
          <NewPlaylistButton variant="contained">
            <ArrowBackIosIcon /> Back
          </NewPlaylistButton>
        </Link>
      </PageWrapper>
    </>
  );
};
