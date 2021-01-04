import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import { IconButton, Tooltip } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginRight: 17,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [menuName, setmenuName] = React.useState(undefined);
  const anchorRef = React.useRef(null);
  const [showEdit, setShowEdit] = React.useState(false);
  const handleToggle = () => {
    console.log(window.location.href);
    if (!localStorage.getItem("handle")) {
      console.log("handle not defined", localStorage.getItem("handle"));
      setmenuName(undefined);
    } else if (document.getElementById("logoutBt") !== null) {
      console.log(
        "handle  defined",
        localStorage.getItem("handle"),
        'document.getElementById("logoutBt")',
        document.getElementById("logoutBt")
      );
      setmenuName("Edit details");
    } else if (
      !window.location.href.endsWith("/" + localStorage.getItem("handle"))
    )
      setmenuName("My Account");
    else console.log("No case ", document.getElementById("logoutBt"));
    setShowEdit(true);

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
  const handleEditDetails = () => {
    setOpen(false);
    if (menuName.includes("Edit")) {
      const editDetails = document.getElementById("editDetails");
      editDetails.click();
    } else window.location.href = `/user/${localStorage.getItem("handle")}`;
  };
  const handleLogout = () => {
    setOpen(false);
    localStorage.removeItem("FBIdToken");
    localStorage.removeItem("handle");
    delete axios.defaults.headers.common["Authorization"];
    window.location.href = "/login";
  };
  return (
    <div className={classes.root}>
      <Tooltip title="Settings" placement="bottom">
        <IconButton
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          tip="Settings"
        >
          <SettingsIcon />
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
                  {showEdit && menuName && (
                    <MenuItem onClick={handleEditDetails}>{menuName}</MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
