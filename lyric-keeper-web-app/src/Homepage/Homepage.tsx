import React, { useEffect, useState } from "react";
import {
  WelcomeText,
  DefaultPageWrapper,
  MainAreaWrapper,
  StyledSelect,
  LyricCount,
  LoginOrCreateAccountText,
  NoLyricsToDisplayText,
} from "./elements";
import { LyricCard } from "LyricCard";
import { NewLyricModal } from "NewLyricModal";
import { useQuery, useMutation } from "react-apollo";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {
  Query_Get_All_Lyrics,
  Mutation_Add_New_Lyric,
  Mutation_Add_New_Lyric_To_User_List,
} from "operations";
import {
  Get_All_Lyrics,
  Lyric,
  Add_New_LyricVariables,
  Add_New_Lyric_To_User_List_addNewLyricToUserList,
  Add_New_Lyric_To_User_ListVariables,
} from "Types";
import { useFormik } from "formik";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  LoadingIndicator,
  LoginCreateAccountModal,
  MarketingModal,
} from "GlobalComponents";
import { UseCurrentUser } from "Hooks";

type allLyrics = Get_All_Lyrics["allLyrics"];

export const Homepage: React.FC<any> = ({ client }) => {
  const [lyricDataSourceOfTruth, setLyricDataSourceOfTruth] = useState<
    allLyrics | undefined
  >([]);
  const [lyricData, setLyricData] = useState<allLyrics | undefined>([]);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [marketingModalIsOpen, setMarketingModalIsOpen] = useState(true);

  const {
    isLoggedIn,
    setUser,
    currentUser,
    currentUserIsLoading,
    logout,
  } = UseCurrentUser();

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

  const [addNewLyricToUserList] = useMutation<
    Add_New_Lyric_To_User_List_addNewLyricToUserList,
    Add_New_Lyric_To_User_ListVariables
  >(Mutation_Add_New_Lyric_To_User_List);

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
    // Handled offline data
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

  useEffect(() => {
    if (
      isLoggedIn ||
      window.localStorage.getItem("showMarketing") === "false"
    ) {
      setLoginModalIsOpen(false);
      setMarketingModalIsOpen(false);
    } else {
      setMarketingModalIsOpen(true);
    }
  }, [isLoggedIn]);

  const addEntry = (lyric: Lyric) => {
    if (currentUser) {
      addNewLyric({ variables: lyric });
      getAndUpdateAllLyrics();

      // const newLyricId = () => {
      //   let returnId = "";
      //   lyricData?.forEach(({ id, title }) => {
      //     if (title === lyric.title) {
      //       returnId = id;
      //     }
      //   });
      //   return returnId;
      // };

      // const lyricId = newLyricId();

      // addNewLyricToUserList({
      //   variables: { uid: currentUser?.uid, lyricId },
      // });
      // console.log({ uid: currentUser?.uid, lyricId });
    }
  };

  const handleMarketingLoginButtonClick = () => {
    setMarketingModalIsOpen(false);
    setLoginModalIsOpen(true);
  };

  if (loading) return <LoadingIndicator />;

  return (
    <DefaultPageWrapper>
      <LoginCreateAccountModal
        currentUserIsLoading={currentUserIsLoading}
        isOpen={loginModalIsOpen}
        setIsOpen={setLoginModalIsOpen}
        setUser={setUser}
      />
      <MarketingModal
        handleLoginButtonClick={handleMarketingLoginButtonClick}
        isOpen={marketingModalIsOpen}
        setIsOpen={setMarketingModalIsOpen}
      />
      {!isLoggedIn ? (
        <LoginOrCreateAccountText onClick={() => setLoginModalIsOpen(true)}>
          Login or Create Account
        </LoginOrCreateAccountText>
      ) : (
        <LoginOrCreateAccountText onClick={() => logout()}>
          Logged in as {currentUser?.email}
          <br />
          Log out
        </LoginOrCreateAccountText>
      )}
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
            <NoLyricsToDisplayText>
              No Lyrics to display...
            </NoLyricsToDisplayText>
          )
        ) : (
          <LoadingIndicator />
        )}
        {isLoggedIn && <NewLyricModal addEntry={addEntry} />}
      </MainAreaWrapper>
    </DefaultPageWrapper>
  );
};
