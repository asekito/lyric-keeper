import React, { useState } from "react";
import {
  DashboardBox,
  FlexWrapper,
  DashboardBoxText,
  StyledDashboardBoxLink,
} from "./elements";
import Container from "@material-ui/core/Container";
import PlusIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import QueueMusicIcon from "@material-ui/icons/QueueMusicOutlined";
import ListIcon from "@material-ui/icons/ListAltOutlined";
import Help from "@material-ui/icons/HelpOutlineOutlined";
import LibraryIcon from "@material-ui/icons/LibraryMusicOutlined";
import { PageHeader } from "GlobalComponents";
import { UseResponsiveCheck, UseCurrentUser } from "Hooks";
import { NewLyricModal } from "NewLyricModal";
import { useMutation } from "react-apollo";
import {
  Add_New_Lyric,
  Add_New_LyricVariables,
  Add_New_Lyric_To_User_List_addNewLyricToUserList,
  Add_New_Lyric_To_User_ListVariables,
  Lyric,
} from "Types";
import {
  Mutation_Add_New_Lyric,
  Mutation_Add_New_Lyric_To_User_List,
} from "operations";
import Grow from "@material-ui/core/Grow";

export const LoggedInView: React.FC<{ darkModeIsEnabled: boolean }> = ({
  darkModeIsEnabled,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { isMobile } = UseResponsiveCheck();
  const { currentUser } = UseCurrentUser();

  const [addNewLyric] = useMutation<Add_New_Lyric, Add_New_LyricVariables>(
    Mutation_Add_New_Lyric
  );

  const [addNewLyricToUserList] = useMutation<
    Add_New_Lyric_To_User_List_addNewLyricToUserList,
    Add_New_Lyric_To_User_ListVariables
  >(Mutation_Add_New_Lyric_To_User_List);

  const addEntry = async (lyric: Lyric) => {
    if (currentUser) {
      const lyricData = await addNewLyric({ variables: lyric });
      // getAndUpdateAllLyrics({ refetchLyrics: true });

      const lyricId = lyricData.data?.addNewLyric?.id;

      if (lyricId) {
        addNewLyricToUserList({
          variables: { uid: currentUser?.uid, lyricId },
        });
      }
    }
  };

  const dashboardBoxes: {
    boxName: string;
    Icon: typeof PlusIcon;
    link?: string;
    onClick?(): void;
  }[] = [
    {
      boxName: "New Lyric",
      Icon: PlusIcon,
      onClick: () => setModalIsOpen(true),
    },
    { boxName: "Library", Icon: LibraryIcon, link: "/library" },
    { boxName: "My Lyrics", Icon: ListIcon, link: "/my-lyrics" },
    { boxName: "My Playlists", Icon: QueueMusicIcon, link: "/my-playlists" },
    { boxName: "Help Page", Icon: Help, link: "/help" },
  ];

  return (
    <>
      <NewLyricModal
        addEntry={addEntry}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
      <Container maxWidth="md">
        <PageHeader
          style={{
            textAlign: isMobile ? "center" : "left",
            fontSize: "1.5rem",
            marginBottom: "20px",
            marginLeft: isMobile ? "auto" : "4%",
          }}
        >
          Dashboard
        </PageHeader>
        <FlexWrapper>
          {dashboardBoxes.map(
            ({ boxName, Icon, onClick = null, link = null }) => {
              const WrappingElement = link
                ? StyledDashboardBoxLink
                : (DashboardBox as any);
              return (
                <Grow key={boxName} in timeout={800}>
                  <WrappingElement
                    darkModeIsEnabled={darkModeIsEnabled}
                    onClick={onClick}
                    to={link}
                  >
                    <DashboardBoxText>
                      {<Icon style={{ fontSize: "4.5rem" }} />}
                      {boxName}
                    </DashboardBoxText>
                  </WrappingElement>
                </Grow>
              );
            }
          )}
        </FlexWrapper>
      </Container>
    </>
  );
};
