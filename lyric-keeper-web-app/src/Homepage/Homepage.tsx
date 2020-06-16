import React, { useEffect, useState } from "react";
import { WelcomeText, DefaultPageWrapper, MainAreaWrapper } from "./elements";
import { LyricCard } from "LyricCard";
import { NewLyricModal } from "NewLyricModal";
import { useQuery } from "react-apollo";
// import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/Select";
import Select from "@material-ui/core/Select";
import { Query_Get_All_Lyrics } from "operations";
import { Get_All_Lyrics } from "Types";

type allLyrics = Get_All_Lyrics["allLyrics"];

export const Homepage: React.FC = () => {
  const [lyricDataSourceOfTruth, setLyricDataSourceOfTruth] = useState<
    allLyrics | undefined
  >([]);
  const [lyricData, setLyricData] = useState<allLyrics | undefined>([]);
  const [searchString, setSearchString] = useState<any>(""); // @TODO: Fix types
  const [filterBy, setFilterBy] = useState<any>("title");

  const { data, loading, error } = useQuery<allLyrics>(Query_Get_All_Lyrics);

  if (loading) console.log("Loading...");

  if (!loading) console.log(data || error);

  const filter = (searchTerm: any) => {
    // @TODO: Fix types
    setLyricData([]);
    // setLyricData(
    //   lyricDataSourceOfTruth.filter(item => item[filterBy].includes(searchTerm))
    // );
  };

  const getAndUpdateAllLyrics = () => {
    setLyricDataSourceOfTruth(data);
    setLyricData(data);
  };

  useEffect(() => {
    getAndUpdateAllLyrics();
  }, []);

  const addEntry = (title: any, chorus: any, verses: any, author: any) => {
    // axios({
    //   method: "post",
    //   url: "/newLyricEntry",
    //   data: {
    //     title: title,
    //     chorus: chorus,
    //     verses: verses,
    //     author: author,
    //   },
    // }).then(() => getAndUpdateAllLyrics());
  };

  return (
    <DefaultPageWrapper>
      <WelcomeText>Lyric Keeper</WelcomeText>
      <MainAreaWrapper>
        <TextField
          label="Search"
          value={searchString}
          onChange={({ target: value }) => {
            setSearchString(value);
            filter(value);
          }}
          style={{ display: "inline-block" }}
        />
        <Select
          value={filterBy}
          onChange={({ target: { value } }) => {
            setFilterBy(value);
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
