import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/HomeTwoTone";
import { useHistory } from "react-router-dom";
import {
  Add,
  SendTwoTone,
  PeopleTwoTone,
  ListAltTwoTone,
  NotificationsTwoTone,
  PowerSettingsNewTwoTone,
} from "@material-ui/icons";
import withWidth from "@material-ui/core/withWidth";
import store from "../redux/store";
import { PAGE_INDEX } from "../redux/type";
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
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function UseTab(props) {
  const classes = useStyles();
  const [selected, setselected] = React.useState(props.index);
  const goBack =
    window.location.pathname !== "/" &&
    !window.location.pathname.includes("home");
  let history = useHistory();
  const handleNewPayment = () => {
    setChange(0);
  };
  const setChange = (index) => {
    console.log(
      '!window.location.pathname.includes("home")',
      !window.location.pathname.includes("home")
    );
    if (index === 0) {
      window.location.href = "/pay";
      return;
    }
    if (index === 2) {
      window.location.href = "/request";
      return;
    }
    if (goBack) {
      console.log("sending back");
      store.dispatch({ type: PAGE_INDEX, payload: index });
      history.push(`/home/${index}`);
      return;
    }
    if (selected !== index) {
      setselected(index);
      handleTabChange(index);
      store.dispatch({ type: PAGE_INDEX, payload: index });
    }
    console.log("set change index", index, "selected", selected);
  };
  const handleTabChange = (index) => {
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
  const handleHome = () => {
    console.log("handle", 1);
    setChange(1);
  };
  const handleRequest = () => {
    console.log("handle", 1);
    setChange(2);
  };
  const handleTransactions = () => {
    console.log("handle", 3);
    setChange(3);
  };
  const handleAccount = () => {
    console.log("handle", 4);
    setChange(4);
  };
  const handleNotification = () => {
    console.log("handle", 5);
    setChange(5);
  };
  const handleLogout = () => {
    console.log("handle", 6);
    setChange(6);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: true,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: true,
          }),
        }}
      >
        <Divider className={classes.toolbar} />

        <List>
          <ListItem
            button
            style={{
              borderRadius: 25,
              color: "#ffffff",
              background: "#369fff",
              maxWidth: "max-content",
              margin: "auto",
            }}
            index={0}
            onClick={handleNewPayment}
            selected={selected === 0}
          >
            <ListItemIcon>
              <Add fontSize="large" style={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary={"New Payment"} />
          </ListItem>
          <br />
          <Divider />

          <ListItem
            button
            index={1}
            onClick={handleHome}
            selected={selected === 1}
          >
            <ListItemIcon>
              <HomeIcon style={selected === 1 ? { color: "#369fff" } : null} />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem
            button
            index={2}
            onClick={handleRequest}
            selected={selected === 2}
          >
            <ListItemIcon>
              <SendTwoTone
                style={selected === 2 ? { color: "#369fff" } : null}
              />
            </ListItemIcon>
            <ListItemText primary={"Request Payment"} />
          </ListItem>

          <ListItem
            button
            index={3}
            onClick={handleTransactions}
            selected={selected === 3}
          >
            <ListItemIcon>
              <ListAltTwoTone
                style={selected === 3 ? { color: "#369fff" } : null}
              />
            </ListItemIcon>
            <ListItemText primary={"Transactions"} />
          </ListItem>
          <ListItem
            button
            index={4}
            onClick={handleAccount}
            selected={selected === 4}
          >
            <ListItemIcon>
              <PeopleTwoTone
                style={selected === 4 ? { color: "#369fff" } : null}
              />
            </ListItemIcon>
            <ListItemText primary={"Account"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            index={5}
            onClick={handleNotification}
            selected={selected === 5}
          >
            <ListItemIcon>
              <NotificationsTwoTone
                style={selected === 5 ? { color: "#369fff" } : null}
              />
            </ListItemIcon>
            <ListItemText primary={"Notifications"} />
          </ListItem>
          <ListItem
            button
            index={6}
            onClick={handleLogout}
            selected={selected === 6}
          >
            <ListItemIcon>
              <PowerSettingsNewTwoTone
                style={selected === 6 ? { color: "#369fff" } : null}
              />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
export default withWidth()(UseTab);
