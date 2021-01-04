import React, { Component } from "react";
import { getTransactionDetails } from "../../redux/actions/dataAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@material-ui/core";
import Success from "../layout/extra/Success";
import Fail from "../layout/extra/Fail";
import ArrowIcon from "@material-ui/icons/ArrowBack";
import CancelIcon from "@material-ui/icons/Close";

class TransactionInformation extends Component {
  handleClose = () => {
    // window.history.back();
    this.props.history.goBack();
  };
  componentDidMount() {
    this.props.getTransactionDetails(this.props.tid);
  }
  getTransactionMarkup = (transaction) => {
    console.log("transaction-details", transaction);
    if (
      !transaction ||
      !transaction.tid === this.props.tid ||
      transaction.loading
    )
      return (
        <CircularProgress
          size={40}
          style={{ placeSelf: "center", marginBottom: "20%", marginTop: "10%" }}
        />
      );
    else if (Object.keys(transaction).length === 0) {
      return (
        <div style={{ textAlign: "center" }}>
          <p>Invalid transaction reference number</p>
        </div>
      );
    } else if (transaction.error) {
      return (
        <div style={{ textAlign: "center" }}>
          <p>Invalid transaction reference number</p>
        </div>
      );
    } else {
      let message;
      if (transaction.status && transaction.status === "success")
        message =
          transaction.type === "sender"
            ? "Money send successfully"
            : "Money recieved successfully";
      else message = transaction.statusMessage;
      return (
        <React.Fragment>
          {transaction.status && (
            <DialogContent style={{ minHeight: 300, textAlign: "center" }}>
              {transaction.status === "success" ? (
                <Success message={message} data={transaction} />
              ) : (
                <Fail message={message} data={transaction} />
              )}
            </DialogContent>
          )}
        </React.Fragment>
      );
    }
  };
  render() {
    const { transaction } = this.props.data;
    const { width, open } = this.props;
    console.log(this.props);
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        fullWidth
        maxWidth
        fullScreen={width === "xs"}
      >
        <DialogTitle>
          <IconButton
            onClick={this.handleClose}
            style={{ marginLeft: -24, marginTop: -6 }}
          >
            {width === "xs" ? (
              <ArrowIcon htmlColor="#369fff" />
            ) : (
              <CancelIcon />
            )}
          </IconButton>
          <span style={{ marginTop: 4 }}>Payment Detail </span>
        </DialogTitle>
        <Divider />
        {this.getTransactionMarkup(transaction)}
      </Dialog>
    );
  }
}
TransactionInformation.propTypes = {
  data: PropTypes.object.isRequired,
  getTransactionDetails: PropTypes.func,

  authenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,

  authenticated: state.user.authenticated,
});
export default connect(mapStateToProps, {
  getTransactionDetails,
})(TransactionInformation);
