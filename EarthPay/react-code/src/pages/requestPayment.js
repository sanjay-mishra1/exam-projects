import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import React, { Component } from "react";
import withWidth from "@material-ui/core/withWidth";
import withStyles from "@material-ui/core/styles/withStyles";
import UserTab from "../util/UserTab";
import UsersBox from "../components/layout/user/UsersBox";
import {
  getRecentContacts,
  sendPaymentRequest,
} from "../redux/actions/dataAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CLEAR_ERRORS, CLEAR_NEW_REQUEST } from "../redux/type";
import ArrowIcon from "@material-ui/icons/ArrowBack";
import store from "../redux/store";
import Success from "../components/layout/extra/Success";
import Fail from "../components/layout/extra/Fail";
import Loading from "../components/layout/Loading";
const style = {
  root: { width: "100%" },
  content: {
    display: "table",
    width: "100%",
    height: "-webkit-fill-available",
    marginBottom: "-5%",
  },
  progress: {
    position: "absolute",
  },
};
class requestPayment extends Component {
  state = {
    uid: null,
    amount: "",
    message: "",
    showPayment: false,
    userImage: null,
    userName: null,
    errors: {},
    size: 8,
    showUsers: true,
  };
  handleUserClick = (uid, userName, userImage) => {
    store.dispatch({ type: CLEAR_NEW_REQUEST });
    store.dispatch({ type: CLEAR_ERRORS });
    if (this.state.uid !== uid) {
      let size = this.state.size;
      if (size === 8) size /= 2;
      this.setState({
        uid,
        userName,
        userImage,
        showPayment: true,
        size,
        amount: "",
        message: "",
        errors: {},
      });
    }
  };
  handleChange = (event) => {
    if (event.target.name === "amount") {
      const onlyNums = event.target.value.replace(/[^0-9]/g, "");

      this.setState({
        [event.target.name]: onlyNums,
      });
    } else
      this.setState({
        [event.target.name]: event.target.value,
      });
  };
  componentDidMount() {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    console.log("params", searchParams);
    console.log("uid", searchParams.get("uid"));

    if (
      searchParams.get("imageUrl") &&
      searchParams.get("uid") &&
      searchParams.get("username") &&
      searchParams.get("amount")
    ) {
      this.setState({
        uid: searchParams.get("uid"),
        amount: searchParams.get("amount"),
        userImage: searchParams.get("imageUrl"),
        userName: searchParams.get("username"),
        showPayment: true,
        showUsers: false,
      });
    } else {
      store.dispatch({ type: CLEAR_ERRORS });
      this.props.getRecentContacts();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      uid: this.state.uid,
      amount: parseInt(this.state.amount),
      message: this.state.message,
    };
    this.props.sendPaymentRequest(data);
  };

  closePaymentWindow = () => {
    this.setState({
      uid: null,
      userName: null,
      userImage: null,
      showPayment: false,
      size: 8,
      amount: "",
      message: "",
      errors: {},
    });
  };
  getTransFields = (classes) => {
    return (
      <React.Fragment>
        <br />
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            id="amount"
            name="amount"
            type="amount"
            label="Amount"
            autoComplete="off"
            helperText={this.state.errors.amount}
            error={this.state.errors.amount ? true : false}
            value={this.state.amount}
            onChange={this.handleChange}
            variant="outlined"
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">₹ </InputAdornment>
              ),
            }}
          />
          <br />
          <br />

          <TextField
            id="message"
            name="message"
            type="message"
            label="Message"
            autoComplete="off"
            helperText={this.state.errors.message}
            error={this.state.errors.message ? true : false}
            value={this.state.message}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={this.props.UI.loading}
          >
            Send
            {this.props.UI.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
        </form>
      </React.Fragment>
    );
  };

  getTransWindow = (classes, width) => {
    if (
      this.props.data.transData.status &&
      this.props.data.transData.message &&
      this.props.data.transData.code === 200 &&
      this.props.data.transData.status === "success"
    ) {
      return <Success message={this.props.data.transData.message} />;
    } else if (
      this.props.data.transData.status &&
      this.props.data.transData.message &&
      this.props.data.transData.code === 500 &&
      this.props.data.transData.status === "failed"
    ) {
      return <Fail message={this.props.data.transData.message} />;
    } else return this.getTransFields(classes);
  };
  getDilog = (classes, width) => {
    return (
      <Dialog
        open={this.state.showPayment}
        onClose={this.handleClose}
        fullWidth
        maxWidth
        fullScreen
      >
        <DialogTitle>
          <IconButton
            onClick={this.closePaymentWindow}
            style={{ marginLeft: -24, marginTop: -6 }}
          >
            <ArrowIcon htmlColor="#369fff" />
          </IconButton>
          <span style={{ marginTop: 4 }}> Send Payment Request</span>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid
            item
            sm={this.state.size}
            lg={this.state.size}
            xs={11}
            style={{ textAlign: "center" }}
          >
            <Card
              variant="outlined"
              className={width !== "xs" ? classes.content : null}
            >
              <br />
              <table>
                <tr>
                  <td>
                    <img
                      style={{ borderRadius: "50%", width: 58, height: 58 }}
                      src={this.state.userImage}
                      alt="user"
                    />
                  </td>
                  <td>
                    <span>{this.state.userName}</span>
                  </td>
                </tr>
              </table>
              <Divider />
              {this.getTransWindow(classes, width)}
              <br />
            </Card>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };
  getTransContent = (classes, width) => {
    return (
      <React.Fragment>
        <Grid
          item
          sm={this.state.size}
          lg={this.state.size}
          xs={11}
          style={{ textAlign: "center" }}
        >
          <Card
            variant="outlined"
            className={width !== "xs" ? classes.content : null}
          >
            <br />
            <table>
              <tr>
                <td>
                  <img
                    style={{ borderRadius: "50%", width: 58, height: 58 }}
                    src={this.state.userImage}
                    alt="user"
                  />
                </td>
                <td>
                  <span>{this.state.userName}</span>
                </td>
              </tr>
            </table>
            <Divider />
            {this.getTransWindow(classes, width)}
            <br />
          </Card>
        </Grid>
      </React.Fragment>
    );
  };
  render() {
    const { loading, users } = this.props.data;

    const { width, classes } = this.props;
    console.log(this.props);
    return (
      <Grid
        container
        spacing={2}
        justify={width !== "xs" ? "center" : "center"}
        className={classes.root}
      >
        <Grid item>
          {width !== "xs" && (
            <UserTab index={2} handleTabChange={this.handleTabChange} />
          )}
        </Grid>
        {loading ? (
          <Loading small={width === "xs"} />
        ) : (
          users &&
          this.state.showUsers && (
            <Grid item sm={this.state.size} lg={this.state.size} xs={11}>
              <UsersBox
                className={width !== "xs" ? classes.content : null}
                users={users}
                onClick={this.handleUserClick}
              />
            </Grid>
          )
        )}
        {this.state.showPayment &&
          width === "xs" &&
          this.getDilog(classes, width)}
        {this.state.showPayment &&
          width !== "xs" &&
          this.getTransContent(classes, width)}
      </Grid>
    );
  }
}

requestPayment.propTypes = {
  getRecentContacts: PropTypes.func,
  UI: PropTypes.object.isRequired,
  sendPaymentRequest: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});
export default withWidth()(
  connect(mapStateToProps, {
    getRecentContacts,
    sendPaymentRequest,
  })(withStyles(style)(requestPayment))
);
