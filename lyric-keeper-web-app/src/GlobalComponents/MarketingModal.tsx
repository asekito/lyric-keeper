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
  MarketingText,
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
          <StyledFab
            size="small"
            onClick={() => {
              setIsOpen(false);
              window.localStorage.setItem("showMarketing", "false");
            }}
          >
            <CloseIcon />
          </StyledFab>
          <MainMarketingHeader variant="h4">
            Members Only Features:
          </MainMarketingHeader>
          <SecondaryMarketingText>
            - Create new lyrics
            <br />- Edit lyrics
          </SecondaryMarketingText>
          <MarketingText>
            You are not currently signed in! To access the above features,
            please login or create an account.
          </MarketingText>
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
