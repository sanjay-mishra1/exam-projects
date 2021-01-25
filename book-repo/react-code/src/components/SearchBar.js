import { Search } from "@material-ui/icons";
import React from "react";
import withStyle from "@material-ui/core/styles/withStyles";
import {
  CircularProgress,
  ClickAwayListener,
  fade,
  Grow,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Radio,
  Typography,
} from "@material-ui/core";
//Redux
import store from "../redux/store";
import {
  LOADING_DATA,
  SEARCH_ACTIVE,
  SEARCH_DATA,
  SEARCH_INACTIVE,
  SET_FILTER,
} from "../redux/type";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSearchResult } from "../redux/actions/dataAction";
import { useHistory } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
const styles = (theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: "auto",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchContainer: {
    position: "absolute",
    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "-webkit-fill-available",
  },
  inputInput: {
    width: "-webkit-fill-available",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});
function SearchBar(props) {
  let history = useHistory();
  const [timer, setTimer] = React.useState(0);
  const [query, setQuery] = React.useState("");
  const [searchName, setSearchName] = React.useState("Books");
  const [showMenu, setShowMenu] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleSearchNameChange = (name) => {
    setSearchName(name);
    // setShowMenu(false);
    handleClose();
  };
  const optionMapping = {
    Books: "title",
    ISBN: "isbn",
    Authors: "name",
  };
  const handleChange = (event) => {
    clearTimeout(timer);
    store.dispatch({
      type: SEARCH_DATA,
      payload: null,
    });
    setQuery(event.target.value);

    setTimer(
      setTimeout(() => {
        sendRequest(event.target.value);
      }, 1000)
    );
  };
  const sendRequest = (value) => {
    let filter;
    if (props.checkBox)
      filter = {
        filter: { type: "Authors", attributes: ["name"], limit: 5 },
      };
    else
      filter = {
        filter: {
          type: searchName === "Authors" ? "Authors" : "Books",
          attributes: [optionMapping[searchName]],
          limit: 5,
        },
      };
    props.getSearchResult(value, { ...filter });
  };
  const onFocus = () => {
    store.dispatch({ type: SEARCH_ACTIVE });
  };
  const onBlur = () => {
    setTimeout(function () {
      // Start the timer
      store.dispatch({ type: SEARCH_INACTIVE });
      store.dispatch({
        type: SEARCH_DATA,
        payload: null,
      });
      setQuery("");
    }, 210);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let searchKey = props.checkBox
      ? document.getElementById("search-custom").value
      : document.getElementById("search").value;

    sendRequest(searchKey);
  };
  const handleClick = (bid, name) => {
    if (props.checkBox) {
      store.dispatch({
        type: SET_FILTER,
        payload: {
          value: "authors",
          searchKey: name,
          previous: "authors",
        },
      });
      loadFilterSearch(name);
    } else {
      if (name) history.push(`/author/${name}`);
      else history.push(`/book/${bid}`);
    }
  };
  const loadFilterSearch = (name) => {
    store.dispatch(
      getSearchResult(
        name,
        {
          filter: {
            type: "Books",
            limit: 20,
            checkCase: false,

            attributes: props.data.filter,
          },
        },
        "books"
      )
    );
    store.dispatch({ type: LOADING_DATA });
  };
  const handleClose = (event) => {
    try {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }

      setShowMenu(false);
    } catch (error) {}
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setShowMenu(false);
    }
  }
  const { classes, searchIconColor, customStyle } = props;
  const resultStyle = {
    overflow: "hidden",
    display: "-webkit-box",
    webkitBoxOrient: "vertical",
    webkitLineClamp: 2,
  };
  const handleToggle = () => {
    setShowMenu((prevOpen) => !prevOpen);
  };
  return (
    <div className={classes.search} style={customStyle}>
      <form noValidate onSubmit={handleSubmit}>
        {!props.checkBox ? (
          <Paper style={{ display: "flex" }}>
            <div onClick={handleToggle} ref={anchorRef}>
              <div
                style={{
                  padding: 8,
                  backgroundColor: "#a2a2a22b",
                  display: "flex",
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="body1"
                  style={{
                    border: "none",
                    background: "transparent",
                  }}
                  component="span"
                >
                  {searchName}
                </Typography>

                <span>
                  <ArrowDropDownIcon size="small" />
                </span>
              </div>

              <Popper
                open={showMenu}
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
                          autoFocusItem={showMenu}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          {["Books", "ISBN", "Authors"].map((item, index) => (
                            <MenuItem
                              onClick={() => {
                                handleSearchNameChange(item);
                              }}
                            >
                              {item}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
            <InputBase
              placeholder="Search…"
              type="search"
              name="search"
              autoComplete="off"
              id={props.checkBox ? "search-custom" : "search"}
              style={{ paddingLeft: "10px" }}
              value={query}
              spellCheck="false"
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={props.checkBox ? null : onBlur}
              classes={{
                root: classes.inputRoot,
              }}
              inputProps={{ "aria-label": "search" }}
            />
            <div style={{ backgroundColor: "#7530ff4f" }}>
              <div
                className={classes.searchIcon}
                style={{ alignSelf: "center", position: "relative" }}
              >
                <Search color={searchIconColor} />
              </div>
            </div>
          </Paper>
        ) : (
          <React.Fragment>
            <div className={classes.searchIcon}>
              <Search color={searchIconColor} />
            </div>

            <InputBase
              placeholder="Search…"
              type="search"
              name="search"
              autoComplete="off"
              id={props.checkBox ? "search-custom" : "search"}
              value={query}
              spellCheck="false"
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={props.checkBox ? null : onBlur}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </React.Fragment>
        )}
      </form>

      {props.data && query && query.trim() !== "" && props.data.search && (
        <Paper className={classes.searchContainer}>
          <List component="nav" aria-label="main mailbox folders">
            {props.data.searchResult ? (
              props.data.searchResult.length === 0 ? (
                <p style={{ paddingLeft: 15 }}>No result found</p>
              ) : (
                props.data.searchResult.map((item, index) =>
                  props.checkbox ? (
                    //<Checkbox key={index} value={item.name} />
                    <Radio key={index} value={item.name} label={item.name} />
                  ) : (
                    <ListItem
                      button
                      key={index}
                      onClick={() => handleClick(item.id, item.name)}
                    >
                      <ListItemIcon>
                        <img
                          style={{ width: 30 }}
                          src={
                            item.imageUrl !== ""
                              ? item.imageUrl
                              : item.name
                              ? "https://firebasestorage.googleapis.com/v0/b/exams-projects.appspot.com/o/common%2Fno-image.png?alt=media&token=23b1e6a1-a7fb-41b2-81e7-ea379f41dbe5"
                              : "https://firebasestorage.googleapis.com/v0/b/exams-projects.appspot.com/o/common%2Fno-cover.jpg?alt=media&token=a13f6987-415f-41fc-8221-8d38d3aaca07"
                          }
                          alt={item.title}
                        />
                      </ListItemIcon>
                      <ListItemText
                        // style={resultStyle}
                        primary={
                          <span style={{ resultStyle }}>
                            {item.title ? item.title : item.name}
                          </span>
                        }
                        secondary={
                          item.authors
                            ? "by " + item.authors
                            : item.books + " books"
                        }
                      />
                    </ListItem>
                  )
                )
              )
            ) : (
              <CircularProgress style={{ marginLeft: "50%" }} size={30} />
            )}
          </List>
        </Paper>
      )}
    </div>
  );
}
SearchBar.propTypes = {
  getSearchResult: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { getSearchResult })(
  withStyle(styles)(SearchBar)
);
