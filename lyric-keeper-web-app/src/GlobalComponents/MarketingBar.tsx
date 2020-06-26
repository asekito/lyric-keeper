import React from "react";
import { MbarWrapper, MbarText, MbarButton } from "./elements";

export const MarketingBar: React.FC = () => (
  <MbarWrapper>
    <MbarText>To create or edit lyrics, you must be logged in.</MbarText>
    <MbarButton variant="outlined">Login</MbarButton>
  </MbarWrapper>
);
