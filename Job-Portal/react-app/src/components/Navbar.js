import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import withWidth from "@material-ui/core/withWidth";

import { Divider, IconButton, Typography } from "@material-ui/core";
import withStyle from "@material-ui/core/styles/withStyles";
import UserTab from "../util/UserTab";
import MenuIcon from "@material-ui/icons/Menu";
import SearchBar from "./SearchBar";

const styles = (theme) => ({
  ...theme.spreadIt,

  title: {
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
  state = { open: false };
  handleDrawerToggle = () => {
    if (this.props.width === "xs") this.setState({ open: !this.state.open });
  };
  getPageIndex = () => {
    let pathName = window.location.pathname;
    if (pathName === "/" || pathName === "/home") return 0;
    else if (pathName.startsWith("/user")) return -1;
    else if (pathName === "/shortlisted") return 1;
    else if (pathName === "/rejected") return 2;
    else return -1;
  };
  render() {
    const { classes, width } = this.props;

    return (
      <Fragment>
        <AppBar className={classes.appBar} color="primary" elevation={0}>
          <Toolbar className="nav-container" style={{ width: "100%" }}>
            {width === "xs" && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            )}
            {width !== "xs" && (
              <Typography className={classes.title} variant="h6" noWrap>
                Job Portal
              </Typography>
            )}
            <SearchBar />
          </Toolbar>
          <Divider />
        </AppBar>
        <UserTab
          index={this.props.UI.index}
          open={this.state.open}
          width={width}
          handleDrawerToggle={this.handleDrawerToggle}
        />
      </Fragment>
    );
  }
}
Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default withWidth()(connect(mapStateToProps)(withStyle(styles)(Navbar)));
