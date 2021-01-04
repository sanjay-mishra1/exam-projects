import { MenuItem, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
export default function NotificationItems({
  not,
  icon,
  message,
  time,
  handleClose,
}) {
  return (
    <MenuItem key={not.createdAt} onClick={handleClose}>
      {icon}
      {not.tid !== not.id && (
        <Typography
          component={Link}
          color="default"
          variant="body1"
          style={{ whiteSpace: "pre-wrap" }}
          to={`/transaction/${not.tid}`}
        >
          {message} {time}
        </Typography>
      )}
      {not.tid === not.id ? (
        not.type !== "request" ? (
          <Typography color="default" variant="body1">
            {message} {time}
          </Typography>
        ) : (
          <Typography
            component={Link}
            color="default"
            variant="body1"
            to={`/pay?imageUrl=${not.imageUrl}&uid=${not.sender}&username=${not.username}&amount=${not.amount}`}
          >
            {message} {time}
          </Typography>
        )
      ) : null}
    </MenuItem>
  );
}
