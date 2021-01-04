import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  withStyles,
} from "@material-ui/core";
import React, { Component, Fragment } from "react";
import PermIdentityTwoToneIcon from "@material-ui/icons/PermIdentityTwoTone";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";
import CalendarTodayTwoToneIcon from "@material-ui/icons/CalendarTodayTwoTone";
import dayjs from "dayjs";
import { connect } from "react-redux";
import PropType from "prop-types";
import { addUserStatus } from "../redux/actions/dataAction";
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
  progress: {
    position: "absolute",
  },
};
class UserInformation extends Component {
  getStartIcon = (btName) => {
    let status = this.props.userInformation.status;
    if (status) {
      if (status !== "pending") {
        if (status === btName) return <CheckCircleTwoToneIcon />;
      }
    }
    return null;
  };
  onRejectClicked = () => {
    if (this.props.userInformation.status !== "rejected")
      this.props.addUserStatus(
        this.props.userInformation.id,
        { status: "rejected" },
        this.props.history
      );
  };
  onShortlistClicked = () => {
    if (this.props.userInformation.status !== "shortlisted")
      this.props.addUserStatus(
        this.props.userInformation.id,
        { status: "shortlisted" },
        this.props.history
      );
  };
  render() {
    const { changingStatus } = this.props.data;
    const { Image, id, name, status, lastChange } = this.props.userInformation;
    const { classes } = this.props;
    return (
      <Paper className={this.props.style}>
        <div
          style={{
            position: "relative",
            display: "flex",
            backgroundColor: "#369fff54",
          }}
        >
          <div style={{ objectFit: "cover", padding: 20, width: "100%" }}>
            <h1>{name}</h1>
          </div>
          <img
            style={{ width: 150, height: 150, margin: 10 }}
            src={Image}
            alt={name}
          />
        </div>

        <Divider />
        <div style={{ margin: 10 }}>
          <br />
          <div>
            <PermIdentityTwoToneIcon
              color="primary"
              className={classes.svgIcon}
            />
            <span className={classes.spanArea}>{id}</span>
          </div>

          <br />
          <Divider style={{ marginLeft: -10, marginRight: -10 }} />
          <br />
          {status !== "pending" && (
            <Fragment>
              <div>
                <CalendarTodayTwoToneIcon
                  color="primary"
                  className={classes.svgIcon}
                />
                <span className={classes.spanArea}>
                  {status.substring(0, 1).toUpperCase() + status.substring(1)}{" "}
                  on {dayjs(lastChange).format("DD MMM YYYY hh:mm a")}{" "}
                </span>
              </div>
              <br />
              <Divider style={{ marginLeft: -10, marginRight: -10 }} />
              <br />
            </Fragment>
          )}
          <Grid container spacing={3}>
            <Grid item sm={6} xs={6} lg={6}>
              <Button
                fullWidth
                onClick={this.onShortlistClicked}
                variant="contained"
                color="secondary"
                disabled={changingStatus && changingStatus === "shortlisted"}
                startIcon={this.getStartIcon("shortlisted")}
              >
                Shortlist
                {changingStatus && changingStatus === "shortlisted" && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
            </Grid>
            <Grid item sm={6} xs={6} lg={6}>
              <Button
                fullWidth
                onClick={this.onRejectClicked}
                variant="outlined"
                color="secondary"
                disabled={changingStatus && changingStatus === "rejected"}
                startIcon={this.getStartIcon("rejected")}
              >
                Reject
                {changingStatus && changingStatus === "rejected" && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
            </Grid>
          </Grid>
        </div>
        <br />
      </Paper>
    );
  }
}
UserInformation.propType = {
  addUserStatus: PropType.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { addUserStatus })(
  withStyles(style)(UserInformation)
);
