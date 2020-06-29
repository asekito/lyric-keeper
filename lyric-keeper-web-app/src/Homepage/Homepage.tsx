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
  LoginOrCreateAccountText,
} from "./elements";
import { LyricCard } from "LyricCard";
import { NewLyricModal } from "NewLyricModal";
import { useQuery, useMutation } from "react-apollo";
import MenuItem from "@material-ui/core/MenuItem";
import RefreshIcon from "@material-ui/icons/Refresh";
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
  Add_New_Lyric,
} from "Types";
import { useFormik } from "formik";
import {
  LoadingIndicator,
  LoginCreateAccountModal,
  MarketingModal,
  MarketingBar,
  LoadingScreen,
} from "GlobalComponents";
import { UseCurrentUser } from "Hooks";
import { UseDarkMode } from "Hooks";

type allLyrics = Get_All_Lyrics["allLyrics"];

export interface SettingsObj {
  refetchLyrics?: boolean;
}

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

  const { darkModeIsEnabled, setDarkMode } = UseDarkMode();

  const {
    handleChange,
    values: { search, filterBy },
  } = useFormik({
    initialValues: { search: "", filterBy: "title" as "title" | "author" },
    onSubmit: () => undefined,
  });

  const { data, loading, refetch } = useQuery(Query_Get_All_Lyrics);

  const [addNewLyric] = useMutation<Add_New_Lyric, Add_New_LyricVariables>(
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

  const getAndUpdateAllLyrics = (settings?: SettingsObj) => {
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
    getAndUpdateAllLyrics({ refetchLyrics: true });
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

  const addEntry = async (lyric: Lyric) => {
    if (currentUser) {
      const lyricData = await addNewLyric({ variables: lyric });
      getAndUpdateAllLyrics({ refetchLyrics: true });

      const lyricId = lyricData.data?.addNewLyric?.id;

      lyricId &&
        addNewLyricToUserList({
          variables: { uid: currentUser?.uid, lyricId },
        });
      console.log({ uid: currentUser?.uid, lyricId });
    }
  };

  const handleMarketingLoginButtonClick = () => {
    setMarketingModalIsOpen(false);
    setLoginModalIsOpen(true);
  };

  if (loading) return <LoadingScreen darkMode={darkModeIsEnabled} />;

  return (
    <>
      {!isLoggedIn && (
        <MarketingBar onLoginButtonClick={() => setLoginModalIsOpen(true)} />
      )}
      <DefaultPageWrapper darkMode={darkModeIsEnabled}>
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
            onClick={() => getAndUpdateAllLyrics({ refetchLyrics: true })}
            style={{ marginLeft: "26px" }}
          >
            <RefreshIcon />
          </StyledIconButton>
          <LyricCount
            darkMode={darkModeIsEnabled}
          >{`Lyrics: ${lyricData?.length}`}</LyricCount>
          {lyricData && lyricData?.length ? (
            lyricData?.map(({ ...props }) => (
              <LyricCard
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
          {isLoggedIn && <NewLyricModal addEntry={addEntry} />}
        </MainAreaWrapper>
      </DefaultPageWrapper>
    </>
  );
};
