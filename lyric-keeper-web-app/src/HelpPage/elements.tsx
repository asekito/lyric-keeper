import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { SecondaryColor } from "ColorVars";

export const StyledSectionButton = styled(Button)`
  color: ${SecondaryColor};
`;

export const StyledDetailsSection = styled(ExpansionPanelDetails)`
  font-size: 1.2rem;
  font-family: sans-serif;
  line-height: 32px;
  text-align: left;
  display: block;
`;

export const Bold = styled.div`
  font-weight: bold;
  display: inline;
`;
