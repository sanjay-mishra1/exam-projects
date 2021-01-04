import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//icon
import NotificationIcon from "@material-ui/icons/Notifications";
import { SendTwoTone, PeopleTwoTone } from "@material-ui/icons";
import AccountBalance from "@material-ui/icons/AccountBalanceWalletTwoTone";

//Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userAction";
import { Badge } from "@material-ui/core";
import relativeTime from "dayjs/plugin/relativeTime";
import AccountBalanceTwoToneIcon from "@material-ui/icons/AccountBalanceTwoTone";
import dayjs from "dayjs";
import NotificationItems from "./NotificationItems";

export class Notification extends Component {
  state = {
    anchorEl: null,
  };
  handleOpen = (event) => {
    this.setState({ anchorEl: event.target });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter((not) => !not.read)
      .map((not) => not.id);
    this.props.markNotificationsRead(unreadNotificationsIds);
  };
  getMessageMarkup = (type, username, amount, message) => {
    if (type) {
      switch (type) {
        case "transfer":
          return `₹${amount} is transferred to ${username} successfully`;
        case "receiver":
          return `₹${amount} is received from ${username} successfully`;
        case "request":
          return (
            <React.Fragment>
              ₹ {amount} is requested by {username}.{" "}
              {message && <React.Fragment>Message:{message}</React.Fragment>}
            </React.Fragment>
          );
        default:
          return message ? message : null;
      }
    } else return message ? message : null;
  };
  getNotificationIcon = (type, iconColor) => {
    if (type) {
      switch (type) {
        case "transfer":
          return <SendTwoTone color={iconColor} style={{ marginRight: 10 }} />;
        case "receiver":
          return (
            <AccountBalance color={iconColor} style={{ marginRight: 10 }} />
          );
        case "request":
          return (
            <AccountBalanceTwoToneIcon
              color={iconColor}
              style={{ marginRight: 10 }}
            />
          );
        default:
          return (
            <PeopleTwoTone color={iconColor} style={{ marginRight: 10 }} />
          );
      }
    } else
      return <PeopleTwoTone color={iconColor} style={{ marginRight: 10 }} />;
  };
  render() {
    const notifications = this.props.notifications;
    const authenticated = this.props.authenticated;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((not) => not.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                notifications.filter((not) => not.read === false).length
              }
              color="secondary"
            >
              <NotificationIcon />
            </Badge>
          ))
        : (notificationsIcon = <NotificationIcon />);
    } else {
      notificationsIcon = <NotificationIcon />;
    }
    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const time = (
            <sapn style={{ color: "gray" }}>
              {dayjs(not.createdAt).fromNow()}
            </sapn>
          );
          const iconColor = not.read ? "primary" : "secondary";
          const icon = this.getNotificationIcon(not.type, iconColor);
          const message = this.getMessageMarkup(
            not.type,
            not.username,
            not.amount,
            not.message
          );
          return (
            <React.Fragment>
              <NotificationItems
                icon={icon}
                message={message}
                not={not}
                time={time}
                key={not.id}
                handleClose={this.handleClose}
              />
            </React.Fragment>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications yet
        </MenuItem>
      );
    return (
      <Fragment>
        {authenticated && (
          <Fragment>
            <Tooltip placement="top" title="Notifications">
              <IconButton
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
                onClick={this.handleOpen}
              >
                {notificationsIcon}
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              onEntered={this.onMenuOpened}
            >
              {notificationsMarkup}
            </Menu>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

Notification.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notification
);
