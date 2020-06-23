import React from "react";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import {
  StyledContainer,
  MarketingWrapper,
  MainMarketingHeader,
  StyledFab,
  SecondaryMarketingText,
  LoginOrCreateAccountButton,
} from "./elements";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  handleLoginButtonClick(): void;
}

export const MarketingModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  handleLoginButtonClick,
}) => {
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <StyledContainer maxWidth="xs">
        <MarketingWrapper>
          <StyledFab size="small" onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </StyledFab>
          <MainMarketingHeader variant="h4">
            Members Only Features:
          </MainMarketingHeader>
          <SecondaryMarketingText>
            - Create new lyrics
            <br />- Edit lyrics
          </SecondaryMarketingText>
          <LoginOrCreateAccountButton
            variant="contained"
            onClick={handleLoginButtonClick}
          >
            Login or Create Account
          </LoginOrCreateAccountButton>
        </MarketingWrapper>
      </StyledContainer>
    </Modal>
  );
};
