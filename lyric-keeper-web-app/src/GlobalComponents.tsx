import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link as OldLink } from "react-router-dom";

export const Link = styled(OldLink)`
  text-decoration: none;
`;

export const LoadingIndicator: React.FC = () => (
  <div style={{ textAlign: "center" }}>
    <CircularProgress style={{ marginRight: "auto", marginTop: "20%" }} />
  </div>
);
