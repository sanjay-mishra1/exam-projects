import { Button, Card, CardContent, CardMedia } from "@material-ui/core";
import React from "react";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";

export default function NotificationBox({ notifications }) {
  console.log(notifications);
  return (
    <React.Fragment>
      {notifications &&
        notifications.length > 0 &&
        notifications.map((item, index) => (
          <Notification data={item} key={index} />
        ))}
    </React.Fragment>
  );
}
const getMessageMarkup = (type, username, amount, message) => {
  if (type) {
    switch (type) {
      case "transfer":
        return `₹${amount} is transferred to ${username} successfully`;
      case "receiver":
        return `₹${amount} is received from ${username} successfully`;
      case "request":
        return (
          <React.Fragment>
            ₹ {amount} is requested by {username}
            <p>Message:{message}</p>
          </React.Fragment>
        );
      default:
        return message ? message : null;
    }
  }
};

function Notification({ data }) {
  const history = useHistory();
  console.log(data);
  const {
    imageUrl,
    amount,
    tid,
    sender,
    type,
    username,
    message,
    createdAt,
  } = data;
  const cursor = type === "request" ? "pointer" : null;
  const onCardClick = () => {
    history.push(
      `/pay?imageUrl=${imageUrl}&uid=${sender}&username=${username}&amount=${amount}`
    );
  };
  return (
    <Card
      onClick={type && type === "request" ? onCardClick : null}
      variant="outlined"
      style={{ position: "relative", display: "flex", cursor: cursor }}
    >
      <CardMedia
        image={imageUrl}
        title=""
        style={{ width: 58, borderRadius: 50, height: 58, margin: 10 }}
        component="img"
      />
      <CardContent style={{ objectFit: "cover", padding: 0, width: "100%" }}>
        <table style={{ width: "100%" }}>
          <tr>
            <td>
              <p>{username}</p>
              <p>{dayjs(createdAt).format("DD MMM YY hh:mm")}</p>
            </td>
            <td style={{ textAlign: "end" }}>
              <Button
                variant="outlined"
                style={{ marginRight: 10 }}
                color="primary"
              >
                {type}
              </Button>
            </td>
          </tr>
          {/* <tr>
            <td>
              
            </td>
          </tr> */}
        </table>
        <h4 style={{ marginTop: -2, lineHeight: "16px" }}>
          {getMessageMarkup(type, username, amount, message)}
        </h4>
      </CardContent>
    </Card>
  );
}
