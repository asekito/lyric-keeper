import React, { useEffect, useState } from "react";
import {
  WelcomeText,
  DefaultPageWrapper,
  MainAreaWrapper,
  StyledSelect,
  LyricCount,
  StyledSwitch,
  StyledTextField,
  StyledIconButton,
  DarkIcon,
  LightIcon,
  NoLyricsToDisplayText,
} from "./elements";
import { LyricCard } from "LyricCard";
import { NewLyricModal } from "NewLyricModal";
import { useQuery, useMutation } from "react-apollo";
import MenuItem from "@material-ui/core/MenuItem";
import { Query_Get_All_Lyrics, Mutation_Add_New_Lyric } from "operations";
import { Get_All_Lyrics, Lyric, Add_New_LyricVariables } from "Types";
import { useFormik } from "formik";
import RefreshIcon from "@material-ui/icons/Refresh";
import { LoadingScreen } from "GlobalComponents";
import { UseDarkMode } from "Hooks";

type allLyrics = Get_All_Lyrics["allLyrics"];

export const Homepage: React.FC<any> = ({ client }) => {
  const [lyricDataSourceOfTruth, setLyricDataSourceOfTruth] = useState<
    allLyrics | undefined
  >([]);
  const [lyricData, setLyricData] = useState<allLyrics | undefined>([]);

  const { darkModeIsEnabled, setDarkMode } = UseDarkMode();

  const {
    handleChange,
    values: { search, filterBy },
  } = useFormik({
    initialValues: { search: "", filterBy: "title" as "title" | "author" },
    onSubmit: () => undefined,
  });

  const { data, loading, refetch } = useQuery(Query_Get_All_Lyrics);

  const [addNewLyric] = useMutation<{ addNewLyric: Add_New_LyricVariables }>(
    Mutation_Add_New_Lyric
  );

  const filter = (searchTerm: string) => {
    setLyricData(
      lyricDataSourceOfTruth &&
        lyricDataSourceOfTruth.filter(item =>
          item[filterBy].toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  };

  interface settingsObj {
    refetchLyrics?: boolean;
  }

  const getAndUpdateAllLyrics = (settings?: settingsObj) => {
    settings?.refetchLyrics && refetch();

    if (!data && !loading) {
      try {
        const cachedData = client.readQuery({
          query: Query_Get_All_Lyrics,
        });
        setLyricData(cachedData.allLyrics as any);
        setLyricDataSourceOfTruth(cachedData.allLyrics);
      } catch (error) {
        console.log(error);
      }
    } else if (data && !loading) {
      setLyricDataSourceOfTruth(data?.allLyrics);
      setLyricData(data?.allLyrics);
    }
  };

  useEffect(() => {
    getAndUpdateAllLyrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  const addEntry = (lyric: Lyric) => {
    addNewLyric({ variables: lyric });
    getAndUpdateAllLyrics();
  };

  if (loading) return <LoadingScreen darkMode={darkModeIsEnabled} />;

  return (
    <DefaultPageWrapper darkMode={darkModeIsEnabled}>
      <WelcomeText darkMode={darkModeIsEnabled} variant="h3">
        Lyric Keeper
      </WelcomeText>
      {darkModeIsEnabled ? <DarkIcon /> : <LightIcon />}
      <StyledSwitch
        checked={darkModeIsEnabled}
        onChange={({ target: { checked } }) => setDarkMode(checked)}
      />
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
          onClick={() => getAndUpdateAllLyrics()}
          style={{ marginLeft: "26px" }}
        >
          <RefreshIcon />
        </StyledIconButton>
        <LyricCount
          darkMode={darkModeIsEnabled}
        >{`Lyrics: ${lyricData?.length}`}</LyricCount>
        {lyricData && lyricData?.length ? (
          lyricData?.map(({ title, author, shortUrl }) => (
            <LyricCard
              title={title}
              author={author}
              shortUrl={shortUrl}
              getAndUpdateAllLyrics={getAndUpdateAllLyrics}
              darkModeIsEnabled={darkModeIsEnabled}
            />
          ))
        ) : (
          <NoLyricsToDisplayText darkMode={darkModeIsEnabled}>
            No Lyrics to display...
          </NoLyricsToDisplayText>
        )}
        <NewLyricModal addEntry={addEntry} />
      </MainAreaWrapper>
    </DefaultPageWrapper>
  );
};
