import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import {
  addUserStatus,
  getAllUsers,
  getSearchResult,
  getUserDetail,
  getUsers,
} from "../redux/actions/dataAction";

import PropTypes from "prop-types";
import { withStyles, withWidth } from "@material-ui/core";
import store from "../redux/store";
import Loading from "../components/Loading";
import { PAGE_INDEX } from "../redux/type";
import UserInformation from "../components/UserInformation";
import UserListContainer from "../components/UserListContainer";
const style = (theme) => ({
  root: { width: "100%" },
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    marginTop: 43,
  },
  userBox: {
    width: 150,
    height: 230,
    cursor: "pointer",
    "&:hover": {
      opacity: "70%",
    },
  },
});
export class home extends Component {
  state = {
    index: -1,
    oldID: -1,
  };
  componentDidMount() {
    if (this.props.match.params.page)
      this.handleTabChange(this.props.match.params.page);
    else this.handleTabChange("home");
  }
  componentDidUpdate(prevProps) {
    let index = this.getIndex(this.props.match.params.page);
    if (this.state.index !== index)
      this.handleTabChange(this.props.match.params.page);
    else if (
      this.props.match.params.id &&
      this.props.match.params.id !== this.state.oldID
    )
      this.handleTabChange("user");
  }
  handleTabChange = (page) => {
    let index = this.getIndex(page);
    store.dispatch({ type: PAGE_INDEX, payload: index });
    if (page === "user") this.setState({ oldID: this.props.match.params.id });
    this.setState({ index });
    switch (index) {
      case 0:
        store.dispatch(getAllUsers());
        break;
      case 1:
        store.dispatch(getUsers("shortlisted"));
        break;
      case 2:
        store.dispatch(getUsers("rejected"));
        break;
      case 3:
        store.dispatch(getUserDetail(this.props.match.params.id));
        break;
      default:
        return;
    }
  };
  getIndex = (page) => {
    if (page === "home") return 0;
    else if (page === "shortlisted") return 1;
    else if (page === "rejected") return 2;
    else if (this.props.match.params.id) return 3;
    else {
      return 0;
    }
  };
  setUsers = (data, pageName) => {
    return (
      <UserListContainer
        userBox={this.props.classes.userBox}
        pageName={pageName}
        data={data}
        width={this.props.width}
        history={this.props.history}
        style={this.props.classes.content}
      />
    );
  };
  getUI = () => {
    let index = this.state.index;
    if (this.props.match.params.id) index = 3;
    switch (index) {
      case 0:
        return (
          <React.Fragment>
            {this.props.data.users &&
              this.props.data.users.length > 0 &&
              this.setUsers(this.props.data.users, "All users")}
          </React.Fragment>
        );

      case 1:
        return (
          <React.Fragment>
            {this.props.data.shortlisted &&
              this.props.data.shortlisted.length > 0 &&
              this.setUsers(this.props.data.shortlisted, "Shortlisted")}
          </React.Fragment>
        );

      case 2:
        return (
          <React.Fragment>
            {this.props.data.rejected &&
              this.props.data.rejected.length > 0 &&
              this.setUsers(this.props.data.rejected, "Rejected")}
          </React.Fragment>
        );
      case 3:
        return (
          <Grid item sm={12} lg={8} xs={12}>
            {this.props.data.user && (
              <UserInformation
                style={this.props.classes.content}
                history={this.props.history}
                userInformation={this.props.data.user}
              />
            )}
          </Grid>
        );
      default:
        return;
    }
  };

  render() {
    const { loading } = this.props.data;
    const { classes, width } = this.props;
    const uiMarkup = loading ? (
      <Loading small={width === "xs"} />
    ) : (
      this.getUI(width)
    );
    return (
      <React.Fragment>
        <main className={classes.toolbar}>{uiMarkup}</main>
      </React.Fragment>
    );
  }
}

home.propTypes = {
  data: PropTypes.object.isRequired,
  addUserStatus: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getSearchResult: PropTypes.func.isRequired,
  getUserDetail: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

export default withWidth()(
  connect(mapStateToProps, {
    addUserStatus,
    getAllUsers,
    getSearchResult,
    getUserDetail,
    getUsers,
  })(withStyles(style)(home))
);
