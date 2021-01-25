import React from "react";
import Card from "@material-ui/core/Card";
import { CardContent, CardMedia, Typography } from "@material-ui/core";
const AuthorBox = (props) => {
  const handleClick = () => {
    props.history.push(`/author/${props.item.name}`);
    //store.dispatch({ type: SET_AUTHOR, payload: props.item });
  };
  const { showLinear } = props;
  return (
    <Card
      variant="outlined"
      className={!showLinear ? props.className : null}
      onClick={handleClick}
    >
      <div
        style={
          showLinear
            ? {
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }
            : null
        }
      >
        <CardMedia
          image={
            props.item.imageUrl !== ""
              ? props.item.imageUrl
              : "https://firebasestorage.googleapis.com/v0/b/exams-projects.appspot.com/o/common%2Fno-image.png?alt=media&token=23b1e6a1-a7fb-41b2-81e7-ea379f41dbe5"
          }
          component="div"
          style={{
            margin: "auto",
            height: showLinear ? 170 : 230,
            width: showLinear ? 170 : 214,
          }}
          title={props.item.name}
        ></CardMedia>
        <CardContent style={{ width: "100%" }}>
          <Typography component="p" variant="body1">
            {props.item.name}
          </Typography>

          <Typography color={"textSecondary"} component="span" variant="body2">
            {props.item.books + " "} books
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default AuthorBox;
