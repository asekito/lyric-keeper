import styled from "styled-components";
import { MainGreen } from "ColorVars";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export const WelcomeText = styled(Typography)`
  font-size: 2rem;
  letter-spacing: 7px;
  color: ${MainGreen};
  border: #0000001c solid 1px;
  border-radius: 6px;
  width: fit-content;
  margin: auto;
  padding: 2px;
  padding-left: 7px;
  margin-top: 50px;
  margin-bottom: 30px;
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
  margin-top: 16px;
  left: 13px;
`;
