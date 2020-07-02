import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { MainGreen } from "ColorVars";

export const PageHeader = styled(Typography)`
  && {
    color: ${MainGreen};
    text-align: center;
    font-size: 2.3rem;
    padding-top: 30px;
    letter-spacing: 3px;
  }
`;
