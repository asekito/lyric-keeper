import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export const LoadingIndicator: React.FC = () => (
  <div style={{ textAlign: "center" }}>
    <CircularProgress style={{ marginRight: "auto", marginTop: "20%" }} />
  </div>
);
