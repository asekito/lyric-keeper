import styled from "styled-components";
import { MainGreen } from "ColorVars";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";

export const WelcomeText = styled.h1`
  font-weight: 500;
  font-size: 40px;
  color: ${MainGreen};
`;

export const DefaultPageWrapper = styled.div`
  text-align: center;
`;

export const MainAreaWrapper = styled(Container)`
  margin: auto;
  padding-bottom: 70px;
`;

export const StyledSelect = styled(Select)`
  width: 4.5rem;
  display: inline-block;
  bottom: -16px;
  left: 13px;
`;
