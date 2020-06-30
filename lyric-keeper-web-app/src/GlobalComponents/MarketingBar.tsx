import React from "react";
import { MbarWrapper, MbarText, MbarButton } from "./elements";

interface Props {
  onLoginButtonClick(): void;
}

export const MarketingBar: React.FC<Props> = ({ onLoginButtonClick }) => (
  <MbarWrapper>
    <MbarText>To create or edit lyrics, you must be logged in.</MbarText>
    <MbarButton variant="outlined" onClick={onLoginButtonClick}>
      Login
    </MbarButton>
  </MbarWrapper>
);
