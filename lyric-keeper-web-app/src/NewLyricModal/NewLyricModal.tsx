import React from "react";
import { HeadingWrapper, HeadingTitle, StyledFab } from "./elements";
import { ModalContentWrapper } from "GlobalComponents";
import { NewLyricForm } from "./NewLyricForm";
import { Lyric } from "Types";
import { UseDarkMode } from "Hooks";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";

interface Props {
  addEntry(item: Lyric): void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
}

export const NewLyricModal = ({ addEntry, isOpen, setIsOpen }: Props) => {
  const onClickFunction = (lyric: Lyric) => {
    addEntry(lyric);
    setIsOpen(false);
  };

  const { darkModeIsEnabled } = UseDarkMode();

  return (
    <>
      <Modal
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
        open={isOpen}
        onClose={() => setIsOpen(false)}
        disableScrollLock={true}
      >
        <ModalContentWrapper darkMode={darkModeIsEnabled}>
          <HeadingWrapper>
            <HeadingTitle>
              New Lyric
              <StyledFab onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </StyledFab>
            </HeadingTitle>
          </HeadingWrapper>
          <NewLyricForm onClickFunction={onClickFunction} />
        </ModalContentWrapper>
      </Modal>
    </>
  );
};
