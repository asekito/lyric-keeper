import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  onClickDelete(): void;
}

export const AreYouSureDialog: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  onClickDelete,
}) => (
  <Dialog open={isOpen}>
    <DialogTitle>Testing...</DialogTitle>
    <Button onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button onClick={onClickDelete}>DELETE</Button>
  </Dialog>
);
