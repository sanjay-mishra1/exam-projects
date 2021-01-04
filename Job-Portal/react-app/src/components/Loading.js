import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";

export default function Loading({ small }) {
  return (
    <Grid
      item
      style={{
        marginTop: small ? "70%" : "20%",
        marginLeft: small ? "42%" : "30%",
      }}
    >
      <CircularProgress size={40} />
    </Grid>
  );
}
