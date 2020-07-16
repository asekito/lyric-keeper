import React, { useState } from "react";
import { Button, Snackbar } from "@material-ui/core";
import {
  HeadingWrapper,
  HeadingTitle,
  StyledModal,
  StyledFab,
} from "./elements";
import { ModalContentWrapper } from "GlobalComponents";
import { NewLyricForm } from "./NewLyricForm";
import AddIcon from "@material-ui/icons/Add";
import { Lyric } from "Types";
import { UseDarkMode } from "Hooks";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
  addEntry(item: Lyric): void;
}

export const NewLyricModal = ({ addEntry }: Props) => {
  const [open, setOpen] = useState(false);

  const onClickFunction = (lyric: Lyric) => {
    addEntry(lyric);
    setOpen(false);
  };

  const { darkModeIsEnabled } = UseDarkMode();

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={true}
      >
        <Button
          onClick={() => {
            setOpen(true);
          }}
          size="large"
          variant="contained"
        >
          <AddIcon /> New Lyric
        </Button>
      </Snackbar>
      <StyledModal
        style={{
          position: "fixed",
          zIndex: 99999,
          right: "0px",
          bottom: "0px",
          top: "0%",
          left: "-95px",
          height: "0px",
        }}
        disableAutoFocus
        open={open}
        onClose={() => setOpen(false)}
        disableScrollLock={true}
      >
        <ModalContentWrapper darkMode={darkModeIsEnabled}>
          <HeadingWrapper>
            <HeadingTitle>
              New Lyric
              <StyledFab onClick={() => setOpen(false)}>
                <CloseIcon />
              </StyledFab>
            </HeadingTitle>
          </HeadingWrapper>
          <NewLyricForm onClickFunction={onClickFunction} />
        </ModalContentWrapper>
      </StyledModal>
    </>
  );
};
