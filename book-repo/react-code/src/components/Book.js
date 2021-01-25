import React from "react";
import Card from "@material-ui/core/Card";
import { CardContent, CardMedia, Typography } from "@material-ui/core";
import { StarTwoTone } from "@material-ui/icons";
import store from "../redux/store";
import { SET_BOOK } from "../redux/type";
const Book = (props) => {
  const handleClick = () => {
    props.history.push(`/book/${props.item.id}`);
    store.dispatch({ type: SET_BOOK, payload: props.item });
  };
  const formatBalance = (balance) => {
    var formatter = new Intl.NumberFormat("enp-IN", {
      style: "currency",
      currency: "INR",
    });
    return formatter.format(balance);
  };
  const { item, showLinear } = props;
  return (
    <Card
      variant="outlined"
      className={!showLinear ? props.className : null}
      // style={showLinear ? { pointer: "cursor" } : null}
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
              : "https://firebasestorage.googleapis.com/v0/b/exams-projects.appspot.com/o/common%2Fno-cover.jpg?alt=media&token=a13f6987-415f-41fc-8221-8d38d3aaca07"
          }
          component="div"
          style={{
            margin: "auto",
            height: showLinear ? 170 : 230,
            width: showLinear ? 170 : 214,
          }}
          title={props.item.title}
        >
          <div
            style={{
              position: !props.relativePos ? "absolute" : "",
              width: 50,
              height: 50,
              borderRadius: "48%",
              backgroundColor: "orange",
              textAlign: "center",
            }}
          >
            <p style={{ color: "#ffffff" }}>
              {Math.round(item.average_rating * 10) / 10}
              <span>
                <StarTwoTone htmlColor="#ffffff" fontSize="small" />
              </span>
            </p>
          </div>
        </CardMedia>
        <CardContent style={{ width: "100%" }}>
          <Typography component="p" variant="body1">
            {props.item.title}
          </Typography>
          <Typography color="primary" component="h5" variant="body1">
            {formatBalance(props.item.price)}
          </Typography>
          <Typography color={"textSecondary"} component="span" variant="body2">
            by {props.item.authors}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default Book;
