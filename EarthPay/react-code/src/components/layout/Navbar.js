import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import withWidth from "@material-ui/core/withWidth";
import AddIcon from "@material-ui/icons/Add";

import Notification from "./Notification";
import { Card, Divider, Fab, Grid, Typography } from "@material-ui/core";
import withStyle from "@material-ui/core/styles/withStyles";
import { UserLogo } from "./user/UserLogo";
import AppIcon from "../../images/icon2.png";

const styles = (theme) => ({
  ...theme.spreadIt,

  title: {
    // display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
});

class Navbar extends Component {
  componentDidMount() {
    // console.log("query", this.props.match.params.query);
  }
  formatBalance = (balance) => {
    var formatter = new Intl.NumberFormat("enp-IN", {
      style: "currency",
      currency: "INR",
    });
    return formatter.format(balance);
  };
  render() {
    const { authenticated, classes, width } = this.props;
    const { imageUrl, balance } = this.props.user.credentials;
    console.log(this.props);
    let logoHeigth = width === "xs" ? 43 : 51;
    let itemPositon = width === "xs" ? "center" : "end";
    let balanceFontSize = width === "xs" ? "inherit" : null;
    return (
      <Fragment>
        <AppBar className={classes.appBar} color="primary" elevation={0}>
          <Toolbar className="nav-container" style={{ width: "100%" }}>
            <Grid container>
              {authenticated ? (
                <React.Fragment>
                  <Grid item sm={2} xs={3} style={{ alignSelf: "center" }}>
                    {balance && (
                      <Card
                        style={{
                          borderRadius: 16,
                          background: "#ffffff",
                          color: "black",
                          textAlign: "center",
                          border: "solid",
                          borderColor: "#369fff",
                        }}
                      >
                        <Typography
                          className={classes.title}
                          variant="h6"
                          noWrap
                          style={{
                            fontFamily: "math",
                            fontSize: balanceFontSize,
                          }}
                        >
                          {this.formatBalance(balance)}
                        </Typography>
                      </Card>
                    )}
                  </Grid>

                  <Grid
                    item
                    sm={6}
                    xs={4}
                    lg={6}
                    style={{
                      paddingLeft: "10%",
                      textAlign: "center",
                      alignSelf: "center",
                    }}
                  >
                    <img
                      src={AppIcon}
                      alt="EarthPay"
                      style={{
                        filter: "invert(1)",
                        height: logoHeigth,
                        marginTop: 7,
                      }}
                    />
                  </Grid>
                  <Grid item sm={4} xs={5} style={{ textAlign: itemPositon }}>
                    {authenticated && <Notification />}
                    <UserLogo imageUrl={imageUrl} width={width} />
                  </Grid>
                </React.Fragment>
              ) : (
                <Fragment>
                  {/* <Grid
                    item
                    sm={2}
                    xs={3}
                    style={{ alignSelf: "center" }}
                  ></Grid> */}

                  <Grid
                    item
                    sm={12}
                    xs={12}
                    lg={12}
                    style={{ textAlign: "center", alignSelf: "center" }}
                  >
                    <Typography className={classes.title} variant="h6">
                      EarthPay
                    </Typography>
                  </Grid>
                  {/* <Grid item sm={4} xs={5} style={{ textAlign: "end" }}></Grid> */}
                </Fragment>
              )}
            </Grid>
          </Toolbar>
          <Divider />
        </AppBar>

        {authenticated &&
          width === "xs" &&
          !window.location.pathname.includes("pay") && (
            <Fab
              variant="extended"
              color="primary"
              aria-label="add"
              style={{ zIndex: "1" }}
              className={classes.fab}
              onClick={() => {
                window.location.href = "/pay";
              }}
            >
              <AddIcon className={classes.extendedIcon} />
              New Payment
            </Fab>
          )}
      </Fragment>
    );
  }
}
Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  user: state.user,
});

export default withWidth()(connect(mapStateToProps)(withStyle(styles)(Navbar)));
