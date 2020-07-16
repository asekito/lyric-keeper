import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { StyledDialogTitle, DialogLyricTitle, DialogButton } from "./elements";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  onClickDelete(): void;
  entryTitle: string;
  confirmationText?: string;
}

export const AreYouSureDialog: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  onClickDelete,
  entryTitle,
  confirmationText,
}) => (
  <Dialog open={isOpen}>
    <StyledDialogTitle>
      {confirmationText
        ? confirmationText
        : "Are you sure you want to delete: "}
      <DialogLyricTitle>{entryTitle}</DialogLyricTitle>
    </StyledDialogTitle>
    <div style={{ textAlign: "center" }}>
      <DialogButton
        style={{ display: "inline" }}
        variant="contained"
        onClick={() => setIsOpen(false)}
      >
        Cancel
      </DialogButton>
      <DialogButton
        variant="outlined"
        style={{ color: "red", display: "inline" }}
        onClick={() => {
          onClickDelete();
          setIsOpen(false);
        }}
      >
        Delete
      </DialogButton>
    </div>
  </Dialog>
);
