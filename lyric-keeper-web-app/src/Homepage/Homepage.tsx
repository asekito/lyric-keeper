import React, { useEffect, useState } from "react";
import {
  WelcomeText,
  DefaultPageWrapper,
  MainAreaWrapper,
  StyledSelect,
  LyricCount,
} from "./elements";
import { LyricCard } from "LyricCard";
import { NewLyricModal } from "NewLyricModal";
import { useQuery, useMutation } from "react-apollo";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Query_Get_All_Lyrics, Mutation_Add_New_Lyric } from "operations";
import { Get_All_Lyrics, Lyric, Add_New_LyricVariables } from "Types";
import { useFormik } from "formik";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import { LoadingIndicator } from "GlobalComponents";

type allLyrics = Get_All_Lyrics["allLyrics"];

export const Homepage: React.FC<any> = ({ client }) => {
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

  if (loading) return <LoadingIndicator />;

  return (
    <DefaultPageWrapper>
      <WelcomeText variant="h3">Lyric Keeper</WelcomeText>
      <MainAreaWrapper maxWidth="sm">
        <TextField
          label="Search"
          name="search"
          value={search}
          variant="standard"
          onChange={e => {
            handleChange(e);
            filter(e.target.value);
          }}
        />
        <StyledSelect value={filterBy} name="filterBy" onChange={handleChange}>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="author">Artist</MenuItem>
        </StyledSelect>
        <IconButton
          onClick={() => getAndUpdateAllLyrics()}
          style={{ marginLeft: "26px" }}
        >
          <RefreshIcon />
        </IconButton>
        <LyricCount>{`Lyrics: ${lyricData?.length}`}</LyricCount>
        {!loading ? (
          lyricData && lyricData?.length ? (
            lyricData?.map(({ title, author, shortUrl }) => (
              <LyricCard
                title={title}
                author={author}
                shortUrl={shortUrl}
                getAndUpdateAllLyrics={getAndUpdateAllLyrics}
              />
            ))
          ) : (
            <div
              style={{
                marginTop: "5vh",
                fontSize: "3vh",
                display: "block",
                letterSpacing: "0.2vw",
              }}
            >
              No Lyrics to display...
            </div>
          )
        ) : (
          <LoadingIndicator />
        )}
        <NewLyricModal addEntry={addEntry} />
      </MainAreaWrapper>
    </DefaultPageWrapper>
  );
};
