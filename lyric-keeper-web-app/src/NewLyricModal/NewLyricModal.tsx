import React, { useState } from "react";
import { Modal, Button, Snackbar } from "@material-ui/core";
import { ModalContentWrapper, HeadingWrapper, HeadingTitle } from "./elements";
import { NewLyricForm } from "./NewLyricForm";
import AddIcon from "@material-ui/icons/Add";

export const NewLyricModal = ({ addEntry }: any) => { // @TODO: FIX types
  const [open, setOpen] = useState(false);

  const onClickFunction = (
    title: any,
    chorus: any,
    verses: any,
    author: any
  ) => { // @TODO: Fix types
    addEntry(title, chorus, verses, author);
    setOpen(false);
  };

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
        <ModalContentWrapper>
          <HeadingWrapper>
            <HeadingTitle>New Lyric</HeadingTitle>
          </HeadingWrapper>
          <NewLyricForm onClickFunction={onClickFunction} />
        </ModalContentWrapper>
      </Modal>
    </>
  );
};
