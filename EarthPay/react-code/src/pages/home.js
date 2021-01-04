import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import {
  getRecentContacts,
  getRecentTransactions,
  getTransactions,
} from "../redux/actions/dataAction";
import {
  getNotifications,
  getUserPersonalData,
  logoutUser,
} from "../redux/actions/userAction";
import PropTypes from "prop-types";
import { withStyles, withWidth } from "@material-ui/core";
import UserTab from "../util/UserTab";
import TransactionBox from "../components/transactions/TransactionBox";
import UsersBox from "../components/layout/user/UsersBox";
import UserInformation from "../components/layout/user/UserInformation";
import store from "../redux/store";
import Loading from "../components/layout/Loading";
import NotificationBox from "../components/layout/NotificationBox";
import TransactionInformation from "../components/transactions/TransactionInformation";
import { PAGE_INDEX } from "../redux/type";
const style = {
  root: { width: "100%" },

  playIcon: {
    left: "50%",
    margin: "-57px 0 0 -31px",
    position: "absolute",
    top: "50%",
    cursor: "pointer",
    zIndex: 1,
  },
  imageContent: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
};
export class home extends Component {
  state = {
    profile: null,
    screenIdParam: null,
    owner: false,
    index: this.props.UI.index,
    globalIndex: this.props.UI.index,
  };
  componentDidMount() {
    console.log("index", this.props.match.params.index);
    if (this.props.match.params.index) {
      let index = parseInt(this.props.match.params.index);
      store.dispatch({
        type: PAGE_INDEX,
        payload: index,
      });
      this.handleTabChange(index);
    }
    if (localStorage.getItem("uid")) {
      this.props.getRecentContacts();
      this.props.getRecentTransactions();
    } else window.location.href = "/login";
  }
  handleTabChange = (index) => {
    console.log("user tab change ", index);
    switch (index) {
      case 0:
        window.location.href = "/pay";
        break;
      case 1:
        store.dispatch(getRecentContacts());
        store.dispatch(getRecentTransactions());
        break;
      case 2:
        window.location.href = "/request";
        break;
      case 3:
        store.dispatch(getTransactions());
        break;
      case 4:
        store.dispatch(getUserPersonalData());
        break;
      case 5:
        console.log("notification");
        store.dispatch(getNotifications());
        break;
      case 6:
        store.dispatch(logoutUser());
        break;

      default:
        return;
    }
  };

  getUI = (width) => {
    let index = this.props.UI.index;
    switch (index) {
      case 0:
        break;
      case 1:
        return (
          <React.Fragment>
            <Grid item sm={8} lg={6} xs={11}>
              {width === "xs" && (
                <UsersBox
                  users={this.props.data.users}
                  customStyle={{ marginBottom: 20 }}
                />
              )}
              <TransactionBox
                history={this.props.history}
                transactions={this.props.data.transactions}
              />
              {width === "sm" || width === "md" ? (
                <UsersBox
                  users={this.props.data.users}
                  customStyle={{ marginTop: 20 }}
                />
              ) : null}
            </Grid>
            <Grid item sm={10} lg={3} xs={11}>
              {width === "lg" && <UsersBox users={this.props.data.users} />}
            </Grid>
          </React.Fragment>
        );

      case 2:
        window.location.href = "/request";
        break;
      case 3:
        return (
          <Grid item sm={8} lg={6} xs={11}>
            <TransactionBox
              history={this.props.history}
              transactions={this.props.data.transactions}
            />
          </Grid>
        );
      case 4:
        return (
          <React.Fragment>
            {this.props.user.userInformation && (
              <Grid item sm={8} lg={8} xs={11}>
                <UserInformation
                  userInformation={this.props.user.userInformation}
                />
              </Grid>
            )}
          </React.Fragment>
        );

      case 5:
        return (
          <React.Fragment>
            {this.props.user.notifications && (
              <Grid item sm={8} lg={8} xs={11}>
                <NotificationBox
                  notifications={this.props.user.notifications}
                />
              </Grid>
            )}
          </React.Fragment>
        );
      case 6:
        store.dispatch(logoutUser());
        window.location.href = "/login";
        break;

      default:
        return;
    }
  };
  openPay = () => {
    window.location.href = "/pay";
  };
  openHome = () => {
    this.props.getRecentContacts();
    this.props.getRecentTransactions();
  };
  openRequest = () => {
    window.location.href = "/request";
  };
  render() {
    const { loading } = this.props.data;
    const { classes, width, authenticated } = this.props;
    console.log(this.props);
    console.log("page type", this.props.match.params.tid);
    const uiMarkup = loading ? (
      <Loading small={width === "xs"} />
    ) : (
      this.getUI(width)
    );
    return (
      <React.Fragment>
        {authenticated && (
          <Grid
            container
            spacing={2}
            justify={width !== "xs" ? "flex-start" : "center"}
            className={classes.root}
          >
            <Grid item>
              {width !== "xs" && (
                <UserTab
                  index={this.props.UI.index}
                  handleTabChange={this.handleTabChange}
                />
              )}
            </Grid>
            {uiMarkup}
            {this.props.match.params.tid && (
              <TransactionInformation
                tid={this.props.match.params.tid}
                width={width}
                history={this.props.history}
                open
              />
            )}
          </Grid>
        )}
      </React.Fragment>
    );
  }
}

home.propTypes = {
  getNotifications: PropTypes.func,
  getRecentContacts: PropTypes.func,
  getRecentTransactions: PropTypes.func,
  getUserPersonalData: PropTypes.func,
  data: PropTypes.object.isRequired,
  getTransactions: PropTypes.func,
  logoutUser: PropTypes.func,
  authenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default withWidth()(
  connect(mapStateToProps, {
    getNotifications,
    getRecentContacts,
    getRecentTransactions,
    getUserPersonalData,
    getTransactions,
    logoutUser,
  })(withStyles(style)(home))
);
