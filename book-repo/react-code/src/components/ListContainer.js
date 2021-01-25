import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import AuthorBox from "./AuthorBox";
import Book from "./Book";
import GridList from "@material-ui/icons/AppsTwoTone";
import LinearList from "@material-ui/icons/ViewList";
export default function ListContainer(props) {
  const [isLinear, setIsLinear] = React.useState(false);
  const { data, history, style, userBox, pageName, width } = props;
  const setDisplay = () => {
    setIsLinear(!isLinear);
  };
  const uiMarkup = data.map((item) => (
    <Grid
      item
      key={item.bookID}
      sm={isLinear ? 12 : "auto"}
      xs={isLinear ? 12 : "auto"}
    >
      {props.pageName === "Authors" ? (
        <AuthorBox
          className={userBox}
          relativePos={props.relativePos}
          history={history}
          showLinear={isLinear}
          item={item}
        />
      ) : (
        <Book
          className={userBox}
          relativePos={props.relativePos}
          history={history}
          item={item}
          showLinear={isLinear}
        />
      )}
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
        {pageName && pageName !== "" && (
          <React.Fragment>
            <div style={{ display: "flex" }}>
              <Typography
                style={{ ...titleMargin, width: "100%" }}
                variant="h5"
              >
                {pageName}
              </Typography>
              <IconButton onClick={setDisplay}>
                {isLinear ? (
                  <GridList color="primary" />
                ) : (
                  <LinearList color="primary" />
                )}
              </IconButton>
            </div>
            <Divider />
          </React.Fragment>
        )}
      </Grid>
      <Grid
        justify={width === "xs" ? "center" : "space-evenly"}
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
