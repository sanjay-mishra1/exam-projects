import { Snackbar } from "@material-ui/core";
import React, { Component } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { CLEAR_CUSTOM_MESSAGE } from "../redux/type";
import store from "../redux/store";

class Alert extends Component {
  state = { open: this.props.open, count: 0 };
  onClose = () => {
    store.dispatch({ type: CLEAR_CUSTOM_MESSAGE });
    console.log("on close called");
  };

  componentDidMount() {
    this.setState({ open: true, count: 1 });
    console.log("comp did mout called");
  }
  componentDidUpdate() {
    console.log("com did update");
  }

  render() {
    console.log("Opening alet prop", this.state.open, "open", this.props.open);
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={this.state.open}
        onClose={this.onClose}
        autoHideDuration={2000}
      >
        <MuiAlert elevation={6} severity={this.props.type} variant="filled">
          {this.props.message}
        </MuiAlert>
      </Snackbar>
    );
  }
}
export default Alert;
