import React, { useState } from "react";
import { Modal, Button, Snackbar } from "@material-ui/core";
import { ModalContentWrapper, HeadingWrapper, HeadingTitle } from "./elements";
import { NewLyricForm } from "./NewLyricForm";
import AddIcon from "@material-ui/icons/Add";
import { Lyric } from "Types";
import { UseDarkMode } from "Hooks";

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
      <Modal
        disableAutoFocus
        open={open}
        onClose={() => setOpen(false)}
        disableScrollLock={true}
      >
        <ModalContentWrapper darkMode={darkModeIsEnabled}>
          <HeadingWrapper>
            <HeadingTitle>New Lyric</HeadingTitle>
          </HeadingWrapper>
          <NewLyricForm onClickFunction={onClickFunction} />
        </ModalContentWrapper>
      </Modal>
    </>
  );
};
