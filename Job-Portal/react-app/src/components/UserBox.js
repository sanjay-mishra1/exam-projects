import React from "react";
import Card from "@material-ui/core/Card";
import { CardContent, CardMedia, Typography } from "@material-ui/core";
const UserBox = (props) => {
  const handleClick = () => {
    props.history.push(`/user/${props.item.id}`);
  };
  return (
    <Card variant="outlined" className={props.className} onClick={handleClick}>
      <CardMedia
        image={props.item.Image}
        component="img"
        style={{ height: 150, width: 150 }}
        title={props.item.name}
      />
      <CardContent>
        <Typography component="p" variant="body1">
          {props.item.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserBox;
