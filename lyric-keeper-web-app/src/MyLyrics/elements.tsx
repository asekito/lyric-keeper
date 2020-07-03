import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { PrimaryBlue } from "ColorVars";
import Container from "@material-ui/core/Container";

export const MainAreaWrapper = styled(Container)`
  margin: auto;
  padding-bottom: 70px;
  padding-top: 40px;
`;

export const NoLyricsFoundText = styled(Typography)`
  && {
    font-size: 2rem;
    color: ${PrimaryBlue};
  }
`;
