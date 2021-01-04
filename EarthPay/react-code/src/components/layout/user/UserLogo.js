import React, { Fragment } from "react";
import { connect } from "react-redux";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import HomeIcon from "@material-ui/icons/HomeTwoTone";
import {
  getRecentContacts,
  getRecentTransactions,
  getTransactions,
} from "../../../redux/actions/dataAction";
import {
  getNotifications,
  getUserPersonalData,
  logoutUser,
} from "../../../redux/actions/userAction";
import {
  SendTwoTone,
  PeopleTwoTone,
  ListAltTwoTone,
  NotificationsTwoTone,
  PowerSettingsNewTwoTone,
} from "@material-ui/icons";
import { CardMedia, Divider, IconButton, Tooltip } from "@material-ui/core";
import store from "../../../redux/store";
import { PAGE_INDEX } from "../../../redux/type";
import { useHistory } from "react-router-dom";

export const UserLogo = (props) => {
  if (props.width !== "xs")
    return (
      <Tooltip title="Settings" placement="bottom">
        <IconButton tip="User">
          <CardMedia
            component="img"
            image={props.imageUrl}
            style={{ borderRadius: 50, width: 28 }}
          />
        </IconButton>
      </Tooltip>
    );
  else return <MenuListComposition imageUrl={props.imageUrl} />;
};

function MenuListComposition(props) {
  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selected, setSelected] = React.useState(1);
  const goBack =
    window.location.pathname !== "/" &&
    !window.location.pathname.includes("home");
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const handleTabChange = (index) => {
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

    console.log("tab change ", index);
  };
  const setChange = (index) => {
    setOpen(false);
    if (goBack) {
      history.push(`/home/${index}`);
      return;
    }

    if (selected !== index) {
      setSelected(index);
      handleTabChange(index);
    }
    store.dispatch({ type: PAGE_INDEX, payload: index });
  };
  const handleHome = () => {
    setChange(1);
  };
  const handleRequest = () => {
    setChange(2);
  };
  const handleTransactions = () => {
    setChange(3);
  };
  const handleAccount = () => {
    setChange(4);
  };
  const handleNotification = () => {
    setChange(5);
  };
  const handleLogout = () => {
    setChange(6);
  };

  // const handleLogout = () => {
  //   setOpen(false);
  //   store.dispatch(logoutUser());
  // };

  return (
    <Fragment>
      <Tooltip title="Settings" placement="bottom">
        <IconButton
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          tip="User"
        >
          <CardMedia
            component="img"
            image={props.imageUrl}
            style={{ borderRadius: 50, width: 28 }}
          />
        </IconButton>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleHome}>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="primary"
                    >
                      <HomeIcon style={{ color: "#0000008a" }} />
                    </IconButton>
                    <p>Home</p>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleRequest}>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="primary"
                    >
                      <SendTwoTone style={{ color: "#0000008a" }} />
                    </IconButton>
                    <p>Request Payment</p>
                  </MenuItem>
                  <Divider />

                  <MenuItem onClick={handleTransactions}>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="primary"
                    >
                      <ListAltTwoTone style={{ color: "#0000008a" }} />
                    </IconButton>
                    <p>Transactions</p>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleAccount}>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="primary"
                    >
                      <PeopleTwoTone style={{ color: "#0000008a" }} />
                    </IconButton>
                    <p>My Account</p>{" "}
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleNotification}>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="primary"
                    >
                      <NotificationsTwoTone style={{ color: "#0000008a" }} />
                    </IconButton>
                    <p>Notification</p>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      color="primary"
                    >
                      <PowerSettingsNewTwoTone style={{ color: "#0000008a" }} />
                    </IconButton>
                    <p>Logout</p>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogo);
