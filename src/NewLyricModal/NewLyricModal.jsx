import React, { useState } from 'react';
import { Modal, Button, Snackbar } from '@material-ui/core';
import { ModalContentWrapper } from './elements.jsx';
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
            //   'la la la chorus stuffs',
            //   'verses stuffss'
            // )
            setOpen(true);
          }}
          size="large"
          variant="contained"
        >
          <AddIcon /> New Lyric
        </Button>
      </Snackbar>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalContentWrapper>
          <h1>Random Modal Test</h1>
        </ModalContentWrapper>
      </Modal>
    </>
  );
};
