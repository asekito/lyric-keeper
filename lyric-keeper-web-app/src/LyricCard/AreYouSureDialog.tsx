import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { StyledDialogTitle, DialogLyricTitle, DialogButton } from "./elements";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  onClickDelete(): void;
  lyricTitle: string;
}

export const AreYouSureDialog: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  onClickDelete,
  lyricTitle,
}) => (
  <Dialog open={isOpen}>
    <StyledDialogTitle>
      Are you sure you want to delete:{" "}
      <DialogLyricTitle>{lyricTitle}</DialogLyricTitle>
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
