import React, { useState, useEffect } from "react";
import { LyricCard } from "LyricCard";
import { Get_All_Lyrics, Get_All_Lyrics_allLyrics } from "Types";
import { useFormik } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  MainAreaWrapper,
  StyledTextField,
  StyledSelect,
  StyledIconButton,
  NoLyricsToDisplayText,
} from "./elements";
import {
  LoadingScreen,
  LyricCountWrapper,
  DefaultPageWrapper,
  Navbar,
  PageHeader,
} from "GlobalComponents";
import { UseDarkMode, UseCurrentUser } from "Hooks";
import { useQuery } from "react-apollo";
import { Query_Get_All_Lyrics } from "operations";
import { findNonPrivateLyrics } from "utilities";
import { SecondaryColor, DarkModeLighterPurple } from "ColorVars";

type allLyrics = Get_All_Lyrics["allLyrics"];

export interface SettingsObj {
  refetchLyrics?: boolean;
}

export const LibraryPage: React.FC<any> = ({ client }) => {
  const [lyricDataSourceOfTruth, setLyricDataSourceOfTruth] = useState<
    allLyrics | undefined
  >([]);
  const [lyricData, setLyricData] = useState<allLyrics | undefined>([]);
  const {
    handleChange,
    values: { search, filterBy },
  } = useFormik({
    initialValues: { search: "", filterBy: "title" as "title" | "author" },
    onSubmit: () => undefined,
  });

  const { currentUser } = UseCurrentUser();

  const { data, loading, refetch } = useQuery(Query_Get_All_Lyrics);

  const { darkModeIsEnabled } = UseDarkMode();

  const filter = (searchTerm: string) => {
    setLyricData(
      lyricDataSourceOfTruth &&
        lyricDataSourceOfTruth.filter(item =>
          item[filterBy].toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  };

  const getAndUpdateAllLyrics = (settings?: SettingsObj) => {
    settings?.refetchLyrics && refetch();
    // Handled offline data
    if (!data || loading) {
      try {
        const cachedData = client.readQuery({
          query: Query_Get_All_Lyrics,
        });
        const nonPrivateLyrics = findNonPrivateLyrics<Get_All_Lyrics_allLyrics>(
          cachedData.allLyrics
        );
        setLyricData(nonPrivateLyrics);
        setLyricDataSourceOfTruth(nonPrivateLyrics);
      } catch (error) {
        console.warn(error);
      }
    } else if (data && !loading) {
      const nonPrivateLyrics = findNonPrivateLyrics<Get_All_Lyrics_allLyrics>(
        data?.allLyrics
      );
      setLyricDataSourceOfTruth(nonPrivateLyrics);
      setLyricData(nonPrivateLyrics);
    }
  };

  useEffect(() => {
    getAndUpdateAllLyrics({ refetchLyrics: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  return (
    <>
      <Navbar />
      <DefaultPageWrapper darkMode={darkModeIsEnabled}>
        <PageHeader style={{ marginBottom: "10px" }}>Library</PageHeader>
        <PageHeader
          style={{
            marginBottom: "30px",
            fontSize: "1.2rem",
            color: darkModeIsEnabled ? DarkModeLighterPurple : SecondaryColor,
            maxWidth: "300px",
            textAlign: "center",
            margin: "0px auto 30px",
          }}
        >
          You can help build this library by creating lyrics that are not
          private. Thank you so much for your contributions!
        </PageHeader>
        <MainAreaWrapper maxWidth="sm">
          <StyledTextField
            darkMode={darkModeIsEnabled}
            label="Search"
            name="search"
            value={search}
            variant="standard"
            onChange={e => {
              handleChange(e);
              filter(e.target.value);
            }}
          />
          <StyledSelect
            darkMode={darkModeIsEnabled}
            value={filterBy}
            name="filterBy"
            onChange={handleChange}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="author">Artist</MenuItem>
          </StyledSelect>
          <StyledIconButton
            darkMode={darkModeIsEnabled}
            onClick={() => getAndUpdateAllLyrics({ refetchLyrics: true })}
            style={{ marginLeft: "26px" }}
          >
            <RefreshIcon />
          </StyledIconButton>
          {loading ? (
            <LoadingScreen topSpacing darkMode={darkModeIsEnabled} />
          ) : (
            <>
              <LyricCountWrapper
                darkMode={darkModeIsEnabled}
              >{`Lyrics: ${lyricData?.length}`}</LyricCountWrapper>
              {lyricData && lyricData?.length ? (
                lyricData?.map(({ ...props }) => (
                  <LyricCard
                    currentUser={currentUser}
                    darkModeIsEnabled={darkModeIsEnabled}
                    getAndUpdateAllLyrics={getAndUpdateAllLyrics}
                    {...props}
                  />
                ))
              ) : (
                <NoLyricsToDisplayText darkMode={darkModeIsEnabled}>
                  No Lyrics to display...
                </NoLyricsToDisplayText>
              )}
            </>
          )}
        </MainAreaWrapper>
      </DefaultPageWrapper>
    </>
  );
};
