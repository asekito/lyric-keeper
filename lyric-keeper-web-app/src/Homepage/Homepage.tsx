import React, { useEffect, useState } from "react";
import {
  WelcomeText,
  DefaultPageWrapper,
  MainAreaWrapper,
  StyledSelect,
} from "./elements";
import { LyricCard } from "LyricCard";
import { NewLyricModal } from "NewLyricModal";
import { useQuery, useMutation } from "react-apollo";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Query_Get_All_Lyrics, Mutation_Add_New_Lyric } from "operations";
import { Get_All_Lyrics, Lyric, Add_New_LyricVariables } from "Types";
import { useFormik } from "formik";
import Container from "@material-ui/core/Container";

type allLyrics = Get_All_Lyrics["allLyrics"];

export const Homepage: React.FC = () => {
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
      searchTerm.length
        ? lyricDataSourceOfTruth &&
            lyricDataSourceOfTruth.filter(item =>
              item[filterBy].includes(searchTerm)
            )
        : lyricDataSourceOfTruth
    );
  };

  const getAndUpdateAllLyrics = () => {
    refetch();
    setLyricDataSourceOfTruth(data?.allLyrics);
    setLyricData(data?.allLyrics);
  };

  useEffect(() => {
    getAndUpdateAllLyrics();
  }, [data]);

  const addEntry = (lyric: Lyric) => {
    addNewLyric({ variables: lyric });
    getAndUpdateAllLyrics();
  };

  if (loading)
    return (
      <CircularProgress
        size="large"
        style={{ textAlign: "center", marginTop: "20%" }}
      />
    );

  return (
    <DefaultPageWrapper>
      <WelcomeText>Lyric Keeper</WelcomeText>
      <MainAreaWrapper maxWidth="sm">
        <Container maxWidth="xs">
          <Grid container>
            <Grid item xs={12} md={6}>
              <TextField
                label="Search"
                name="search"
                value={search}
                variant="standard"
                onChange={e => {
                  handleChange(e);
                  filter(search);
                }}
                style={{ display: "inline-block" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledSelect
                value={filterBy}
                name="filterBy"
                onChange={handleChange}
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="author">Artist</MenuItem>
              </StyledSelect>
            </Grid>
          </Grid>
        </Container>
        {!loading ? (
          lyricData && lyricData.length ? (
            lyricData.map(({ title, author, shortUrl }) => (
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
          <CircularProgress
            size="large"
            style={{ textAlign: "center", marginTop: "20%" }}
          />
        )}
        <NewLyricModal addEntry={addEntry} />
      </MainAreaWrapper>
    </DefaultPageWrapper>
  );
};
