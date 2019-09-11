import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {
  WelcomeText,
  DefaultPageWrapper,
  MainAreaWrapper,
  TextField,
} from './elements';
import { LyricCard } from '../LyricCard';
// import { NewLyricModal } from '../NewLyricModal';
import axios from 'axios';
// import { TextField, Select, MenuItem } from '@material-ui/core';

export const HomePage = () => {
  const [lyricDataSourceOfTruth, setLyricDataSourceOfTruth] = useState([]);
  const [lyricData, setLyricData] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [filterBy, setFilterBy] = useState('title');

  const filter = (searchTerm) => {
    setLyricData([]);
    setLyricData(
      lyricDataSourceOfTruth.filter((item) =>
        item[filterBy].includes(searchTerm)
      )
    );
  };

  const getAndUpdateAllLyrics = () => {
    axios.get('http://localhost:3000/getAllLyrics').then(({ data }) => {
      setLyricDataSourceOfTruth(data);
      setLyricData(data);
    });
  };

  useEffect(() => {
    getAndUpdateAllLyrics();
  }, []);

  // const addEntry = (title, chorus, verses, author) => {
  //   axios({
  //     method: 'post',
  //     url: '/newLyricEntry',
  //     data: {
  //       title: title,
  //       chorus: chorus,
  //       verses: verses,
  //       author: author,
  //     },
  //   }).then(() => getAndUpdateAllLyrics());
  // };

  return (
    <DefaultPageWrapper>
      <WelcomeText>Lyric Keeper</WelcomeText>
      <MainAreaWrapper>
        {/*
                <StyledTextInput
        onFocus={() => setInputText('')}
        defaultValue="Input text, here"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
        */}
        {/* <TextField
          defaultValue="Search"
          value={searchString}
          onChangeText={(text) => {
            setSearchString(text);
            filter(text);
          }}
          style={{ flexDirection: 'column' }}
        /> */}
        {/* <Select
          value={filterBy}
          onChange={(e) => {
            setFilterBy(e.target.value);
          }}
          style={{
            display: 'inline-block',
            width: '7%',
            bottom: '-16px',
            left: '13px',
          }}
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="author">Artist</MenuItem>
        </Select> */}
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
          <View
            style={{
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 30 }}>No Lyrics to display...</Text>
          </View>
        )}
        {/* <NewLyricModal addEntry={addEntry} /> */}
      </MainAreaWrapper>
    </DefaultPageWrapper>
  );
};
