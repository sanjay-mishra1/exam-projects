import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";

import Typography from "@material-ui/core/Typography";
//MUI icons
import HomeIcon from "@material-ui/icons/HomeTwoTone";
//images
import ShortlistIcon from "../images/shortlistIcon.svg";
import RejectIcon from "../images/rejectedIcon.svg";
import SiteIcon from "../images/jobIcon.svg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  hide: {
    display: "none",
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    zIndex: "auto",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function UseTab(props) {
  const classes = useStyles();

  let history = useHistory();
  const theme = useTheme();

  const setChange = (page, index) => {
    if (
      props.index !== index ||
      history.location.pathname.startsWith("/user")
    ) {
      history.push(`/${page}`);
    }
    props.handleDrawerToggle();
  };

  const handleHome = () => {
    setChange("home", 0);
  };
  const handleSelected = () => {
    setChange("shortlisted", 1);
  };
  const handleRejected = () => {
    setChange("rejected", 2);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} style={{ justifyContent: "center" }}>
        {props.width === "xs" && (
          <React.Fragment>
            <img src={SiteIcon} alt="" style={{ width: 30 }} />
            <Typography
              style={{ justifyContent: "end", paddingLeft: 10 }}
              className={classes.title}
              variant="h6"
              noWrap
            >
              Job Portal
            </Typography>
          </React.Fragment>
        )}
      </div>
      <Divider />
      <List>
        <ListItem
          button
          index={0}
          onClick={handleHome}
          selected={props.index === 0}
        >
          <ListItemIcon>
            <HomeIcon
              style={
                props.index === 0
                  ? { color: "#FF5722", fontSize: "2.1em" }
                  : { fontSize: "2.1em" }
              }
            />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>

        <ListItem
          button
          index={1}
          onClick={handleSelected}
          selected={props.index === 1}
        >
          <ListItemIcon>
            <img
              src={ShortlistIcon}
              alt={""}
              style={
                props.index === 1
                  ? { width: 30 }
                  : { filter: "grayscale(1)", width: 30 }
              }
            />
          </ListItemIcon>
          <ListItemText primary={"Shortlisted"} />
        </ListItem>
        <ListItem
          button
          index={2}
          onClick={handleRejected}
          selected={props.index === 2}
        >
          <ListItemIcon>
            <img
              src={RejectIcon}
              alt={""}
              style={
                props.index === 2
                  ? { width: 30 }
                  : { filter: "grayscale(1)", width: 30 }
              }
            />
          </ListItemIcon>
          <ListItemText primary={"Rejected"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Fragment>
      <CssBaseline />

      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={props.open}
            onClose={props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </Fragment>
  );
}

export default withWidth()(UseTab);
