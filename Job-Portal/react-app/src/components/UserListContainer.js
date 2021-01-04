import { Divider, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import UserBox from "./UserBox";

export default function UserListContainer(props) {
  const { data, history, style, userBox, pageName, width } = props;
  const uiMarkup = data.map((item) => (
    <Grid item key={item.id}>
      <UserBox className={userBox} history={history} item={item} />
    </Grid>
  ));
  const titleMargin =
    width === "xs"
      ? { paddingTop: 10, paddingLeft: 15, paddingBottom: 10 }
      : { paddingLeft: 37, paddingTop: 10, paddingBottom: 13 };
  const gridMagin =
    width === "xs" ? { padding: 0, marginTop: 10 } : { padding: 25 };
  return (
    <Paper variant="outlined" className={style}>
      <Grid item xs={12} lg={12}>
        <Typography style={{ ...titleMargin }} variant="h5">
          {pageName}
        </Typography>
        <Divider />
      </Grid>
      <Grid
        justify={width === "xs" ? "center" : null}
        style={gridMagin}
        spacing={2}
        container
      >
        {uiMarkup}
      </Grid>
      <br />
    </Paper>
  );
}
