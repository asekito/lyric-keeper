import React from "react";
import {
  PageHeader,
  PageWrapper,
  MainAreaWrapper,
  NoLyricsFoundText,
} from "./elements";
import { UseDarkMode, UseCurrentUser } from "Hooks";
import { Link, LoadingIndicator } from "GlobalComponents";
import IconButton from "@material-ui/core/IconButton";
import Home from "@material-ui/icons/Home";
import { SecondaryLightGrey, SecondaryColor } from "ColorVars";
import Button from "@material-ui/core/Button";
import { useQuery } from "react-apollo";
import { Query_Get_Multiple_Lyrics_By_Id } from "operations";
import {
  Get_Multiple_Lyrics_By_Id,
  Get_Multiple_Lyrics_By_IdVariables,
} from "Types";
import { LyricCard } from "LyricCard";

export const MyLyrics: React.FC = () => {
  const { darkModeIsEnabled } = UseDarkMode();
  const { currentUser, isLoggedIn } = UseCurrentUser();

  const { data, loading, refetch } = useQuery<
    Get_Multiple_Lyrics_By_Id,
    Get_Multiple_Lyrics_By_IdVariables
  >(Query_Get_Multiple_Lyrics_By_Id, {
    skip: !isLoggedIn || !currentUser?.lyrics?.length,
    variables: {
      ids: currentUser?.lyrics?.map(({ lyricId }) => ({
        lyricId,
      })),
    },
  });

  if (!isLoggedIn)
    return (
      <MainAreaWrapper maxWidth="sm">
        <PageWrapper isDarkMode={darkModeIsEnabled}>
          <NoLyricsFoundText>
            It looks like you haven't created any lyrics yet. You can create new
            lyrics from the <Link to="/">Homescreen</Link>
          </NoLyricsFoundText>
        </PageWrapper>
      </MainAreaWrapper>
    );

  return (
    <PageWrapper isDarkMode={darkModeIsEnabled}>
      <Link to="/">
        <IconButton
          style={{
            marginTop: "50px",
            backgroundColor: SecondaryLightGrey,
          }}
        >
          <Home />
        </IconButton>
      </Link>
      <PageHeader variant="h4">My Lyrics</PageHeader>
      <MainAreaWrapper maxWidth="sm">
        {loading && <LoadingIndicator />}
        {data?.getMultipleLyricsById && data?.getMultipleLyricsById.length ? (
          data.getMultipleLyricsById.map(({ ...props }) => (
            <LyricCard
              currentUser={currentUser}
              darkModeIsEnabled={darkModeIsEnabled}
              getAndUpdateAllLyrics={() => refetch()}
              {...props}
            />
          ))
        ) : (
          <NoLyricsFoundText>
            It looks like you haven't created any lyrics yet. You can create new
            lyrics from the <Link to="/">Homescreen</Link>
          </NoLyricsFoundText>
        )}
      </MainAreaWrapper>
    </PageWrapper>
  );
};
