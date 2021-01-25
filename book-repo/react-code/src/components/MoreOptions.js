import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginRight: 17,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MoreOptions(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  //   const [menuName, setmenuName] = React.useState(undefined);
  const anchorRef = React.useRef(null);
  //   const [showEdit, setShowEdit] = React.useState(false);
  const [options, setOptions] = React.useState(["Authors", "Cart"]);
  const history = useHistory();
  const handleToggle = () => {
    if (props.page === "/" || props.page === "/books")
      setOptions(["Authors", "Cart"]);
    else if (props.page === "/cart") setOptions(["Books", "Authors"]);
    else setOptions(["Books", "Cart"]);
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
  const handleMenuClick = (name) => {
    history.push(`/${name.toLowerCase()}`);
    setOpen(false);
  };
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div
      className={classes.root}
      style={props.width === "xs" ? { marginRight: -17 } : null}
    >
      {props.width !== "xs" ? (
        <React.Fragment>
          {props.page && (props.page === "/books" || props.page === "/") ? (
            <Button color="inherit" component={Link} to="/authors">
              Authors
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/books">
              Books
            </Button>
          )}
          {props.page !== "/cart" && (
            <Button color="inherit" component={Link} to="/cart">
              Cart
            </Button>
          )}
        </React.Fragment>
      ) : (
        <Tooltip title="Options" placement="bottom">
          <IconButton
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            tip="Options"
          >
            <MoreVertIcon htmlColor="#ffffff" />
          </IconButton>
        </Tooltip>
      )}

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
                  {options.map((item, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        handleMenuClick(item);
                      }}
                    >
                      {item}
                    </MenuItem>
                  ))}
                  {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
