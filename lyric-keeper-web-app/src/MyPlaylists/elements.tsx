import styled from "styled-components";
import { PrimaryBlue } from "ColorVars";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export const NoPlaylistsText = styled(Typography)`
  && {
    margin-top: 30px;
    font-size: 2rem;
    color: ${PrimaryBlue};
  }
`;

export const NewPlaylistButton = styled(Button)`
  && {
    margin-top: 30px;
  }
`;
