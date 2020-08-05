import React, { useEffect, useState } from "react";
import {
  WelcomeText,
  DefaultPageWrapper,
  MainAreaWrapper,
  StyledSelect,
  StyledSwitch,
  StyledTextField,
  StyledIconButton,
  DarkIcon,
  LightIcon,
  NoLyricsToDisplayText,
  StyledLink,
} from "./elements";
import { LyricCard } from "LyricCard";
import { NewLyricModal } from "NewLyricModal";
import { useQuery, useMutation } from "react-apollo";
import MenuItem from "@material-ui/core/MenuItem";
import RefreshIcon from "@material-ui/icons/Refresh";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
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
  Get_All_Lyrics_allLyrics,
} from "Types";
import { useFormik } from "formik";
import {
  LoginCreateAccountModal,
  MarketingModal,
  MarketingBar,
  LoadingScreen,
  Navbar,
  LyricCountWrapper,
} from "GlobalComponents";
import { UseCurrentUser, UseDarkMode } from "Hooks";
import { findNonPrivateLyrics } from "utilities";

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

  const currentUserDetails = UseCurrentUser();

  const {
    isLoggedIn,
    setUser,
    currentUser,
    currentUserIsLoading,
  } = currentUserDetails;

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
    }
  };

  const handleMarketingLoginButtonClick = () => {
    setMarketingModalIsOpen(false);
    setLoginModalIsOpen(true);
  };

  // if (loading) return <LoadingScreen darkMode={darkModeIsEnabled} />;

  return (
    <>
      {!isLoggedIn && (
        <MarketingBar onLoginButtonClick={() => setLoginModalIsOpen(true)} />
      )}
      <Navbar {...currentUserDetails} />
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
        <StyledLink to="/help">
          <HelpOutlineIcon style={{ fontSize: "1.2rem" }} />
          <div style={{ display: "inline", marginLeft: "5px" }}>
            How to use this app
          </div>
        </StyledLink>
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
          {isLoggedIn && <NewLyricModal addEntry={addEntry} />}
        </MainAreaWrapper>
      </DefaultPageWrapper>
    </>
  );
};
