import React, { useEffect, useState } from "react";
import { WelcomeText, DefaultPageWrapper, MainAreaWrapper } from "./elements";
import { LyricCard } from "LyricCard";
import { NewLyricModal } from "NewLyricModal";
import { useQuery, useMutation } from "react-apollo";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Query_Get_All_Lyrics, Mutation_Add_New_Lyric } from "operations";
import { Get_All_Lyrics, Lyric, Add_New_LyricVariables } from "Types";
import { useFormik } from "formik";

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

  const { data, loading, error } = useQuery(Query_Get_All_Lyrics);

  const [addNewLyric] = useMutation<{ addNewLyric: Add_New_LyricVariables }>(
    Mutation_Add_New_Lyric,
    { onCompleted: () => {} }
  );

  const filter = (searchTerm: string) => {
    setLyricData(
      lyricDataSourceOfTruth &&
        lyricDataSourceOfTruth.filter(item =>
          item[filterBy].includes(searchTerm)
        )
    );
  };

  const getAndUpdateAllLyrics = () => {
    setLyricDataSourceOfTruth(data?.allLyrics);
    setLyricData(data?.allLyrics);
  };

  useEffect(() => {
    getAndUpdateAllLyrics();
  }, [data]);

  const addEntry = (lyric: Lyric) => {
    addNewLyric({ variables: lyric });
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
      <MainAreaWrapper>
        <TextField
          label="Search"
          name="search"
          value={search}
          onChange={e => {
            handleChange(e);
            filter(search);
          }}
          style={{ display: "inline-block" }}
        />
        <Select
          value={filterBy}
          name="filterBy"
          onChange={e => {
            handleChange(e);
            console.log(filterBy);
          }}
          style={{
            display: "inline-block",
            width: "7%",
            bottom: "-16px",
            left: "13px",
          }}
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="author">Artist</MenuItem>
        </Select>
        {lyricData && lyricData.length ? (
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
        )}
        <NewLyricModal addEntry={addEntry} />
      </MainAreaWrapper>
    </DefaultPageWrapper>
  );
};
