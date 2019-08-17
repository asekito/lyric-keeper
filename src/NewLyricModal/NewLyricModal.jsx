import React, { useState } from 'react';
import { Modal, Button, Snackbar } from '@material-ui/core';
import {
  ModalContentWrapper,
  HeadingWrapper,
  HeadingTitle,
} from './elements.jsx';
import { NewLyricForm } from './NewLyricForm.jsx';
import AddIcon from '@material-ui/icons/Add';

export const NewLyricModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={true}
      >
        <Button
          onClick={() => {
            // addEntry(
            //   'Random title',
            //    'author'
            //   'la la la chorus stuffs',
            //   'verses stuffss',
            // )
            setOpen(true);
          }}
          size="large"
          variant="contained"
        >
          <AddIcon /> New Lyric
        </Button>
      </Snackbar>
      <Modal disableAutoFocus open={open} onClose={() => setOpen(false)}>
        <ModalContentWrapper>
          <HeadingWrapper>
            <HeadingTitle>Random Modal Test</HeadingTitle>
          </HeadingWrapper>
          <NewLyricForm />
        </ModalContentWrapper>
      </Modal>
    </>
  );
};
