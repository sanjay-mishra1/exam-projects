import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";

export default function Loading({ small }) {
  console.log(small);
  return (
    <Grid
      item
      style={{
        marginTop: small ? "70%" : "20%",
        marginLeft: small ? "0%" : "30%",
      }}
    >
      <CircularProgress size={40} />
    </Grid>
  );
}
