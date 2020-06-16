import React, { useEffect, useState } from "react";
import { WelcomeText, DefaultPageWrapper, MainAreaWrapper } from "./elements";
import { LyricCard } from "../LyricCard";
import { NewLyricModal } from "../NewLyricModal";
// import axios from "axios";
import { TextField, Select, MenuItem } from "@material-ui/core";

export const Homepage: React.FC = () => {
  const [lyricDataSourceOfTruth, setLyricDataSourceOfTruth] = useState([]);
  const [lyricData, setLyricData] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filterBy, setFilterBy] = useState<any>("title");

  const filter = (searchTerm: string) => {
    setLyricData([]);
    // setLyricData(
    //   lyricDataSourceOfTruth.filter(item => item[filterBy].includes(searchTerm))
    // );
  };

  const getAndUpdateAllLyrics = () => {
    // axios.get("/getAllLyrics").then(({ data }) => {
    //   setLyricDataSourceOfTruth(data);
    //   setLyricData(data);
    // });
    return [];
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
          onChange={e => {
            setSearchString(e.target.value);
            filter(e.target.value);
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
        {lyricData.length ? (
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
