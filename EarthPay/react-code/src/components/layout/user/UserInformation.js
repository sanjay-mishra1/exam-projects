import { Divider, Paper, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import MailTwoToneIcon from "@material-ui/icons/MailTwoTone";
import Mobile from "@material-ui/icons/PhoneAndroidOutlined";
import AccountBalance from "@material-ui/icons/AccountBalanceWalletTwoTone";
import CalendarTodayTwoToneIcon from "@material-ui/icons/CalendarTodayTwoTone";
import dayjs from "dayjs";
const style = {
  svgIcon: {
    float: "left",
    marginTop: 6,
  },
  spanArea: {
    width: "79%",
    height: 18,
    marginStart: "10px",
    marginTop: 9,
    display: "inline-block",
    textAlign: "left",
    marginBottom: 10,
  },
};
class UserInformation extends Component {
  formatBalance = (balance) => {
    var formatter = new Intl.NumberFormat("enp-IN", {
      style: "currency",
      currency: "INR",
    });
    return formatter.format(balance);
  };
  render() {
    const {
      balance,
      createdAt,
      email,
      imageUrl,
      mobilenumber,

      username,
    } = this.props.userInformation;
    const { classes } = this.props;
    return (
      <Paper>
        <div
          style={{
            position: "relative",
            display: "flex",
            backgroundColor: "#369fff54",
          }}
        >
          <div style={{ objectFit: "cover", padding: 20, width: "100%" }}>
            <h1>{username}</h1>
            <AccountBalance color="primary" className={classes.svgIcon} />
            <span
              style={{ fontSize: "large", marginTop: 6 }}
              className={classes.spanArea}
            >
              {this.formatBalance(balance)}
            </span>
          </div>
          <img
            style={{ width: 150, height: 150, margin: 10 }}
            src={imageUrl}
            alt={username}
          />
        </div>

        <Divider />
        <div style={{ margin: 10 }}>
          <div>
            <Mobile color="primary" className={classes.svgIcon} />
            <span className={classes.spanArea}>{mobilenumber}</span>
          </div>
          <br />
          <div>
            <MailTwoToneIcon color="primary" className={classes.svgIcon} />
            <span className={classes.spanArea}>{email}</span>
          </div>

          <br />
          <div>
            <CalendarTodayTwoToneIcon
              color="primary"
              className={classes.svgIcon}
            />
            <span className={classes.spanArea}>
              Joined {dayjs(createdAt).format("MMM YYYY")}{" "}
            </span>
          </div>
        </div>
      </Paper>
    );
  }
}
export default withStyles(style)(UserInformation);
