import React, { Fragment } from "react";
//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
//images
import SiteIcon from "../images/logo.png";
import { Rating } from "@material-ui/lab";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import SearchBar from "../components/SearchBar";
import store from "../redux/store";
import { LOADING_DATA, SET_FILTER } from "../redux/type";
import { getSearchResult } from "../redux/actions/dataAction";
import language from "../files/language_list.json";
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
  let dataFilter = props.data.filter;
  const theme = useTheme();
  const getOrderInitialValue = () => {
    if (dataFilter.includes("alphabetical")) return "alphabetical";
    else if (dataFilter.includes("ratings_count")) return "ratings_count";
    else if (dataFilter.includes("price-high")) return "price-high";
    else if (dataFilter.includes("price-low")) return "price-low";
    else return "none";
  };
  const getInitialRatingsValue = () => {
    if (dataFilter.includes("average_rating-5-5")) return "average_rating-5-5";
    else if (dataFilter.includes("average_rating-4-5"))
      return "average_rating-4-5";
    else if (dataFilter.includes("average_rating-3-5"))
      return "average_rating-3-5";
    else if (dataFilter.includes("average_rating-2-5"))
      return "average_rating-2-5";
    else if (dataFilter.includes("average_rating-1-5"))
      return "average_rating-1-5";
    else return "none";
  };
  const getInitialMenuLanguage = () => {
    var lan = "all";
    dataFilter.forEach((item) => {
      if (item.includes("language_code")) lan = item;
    });
    return lan.split("-")[1];
  };
  const [value, setValue] = React.useState(getOrderInitialValue());
  const [ratingValue, setRatingValue] = React.useState(
    getInitialRatingsValue()
  );
  const [menuLanguage, setMenuLanguage] = React.useState(
    getInitialMenuLanguage()
  );
  const handleOrderChange = (event) => {
    store.dispatch({
      type: SET_FILTER,
      payload: { value: event.target.value, previous: value },
    });

    setValue(event.target.value);
    loadFilterSearch();
  };
  const handleRatingChange = (event) => {
    store.dispatch({
      type: SET_FILTER,
      payload: { value: event.target.value, previous: ratingValue },
    });

    setRatingValue(event.target.value);
    loadFilterSearch();
  };
  const handleLanguageChange = (event) => {
    let value = event.target.value;
    if (value === "all") value = "none";
    else value = "language_code-" + value;
    store.dispatch({
      type: SET_FILTER,
      payload: {
        value: value,
        previous: "language_code-" + menuLanguage,
      },
    });

    setMenuLanguage(event.target.value);
    loadFilterSearch();
  };
  const loadFilterSearch = () => {
    props.handleDrawerToggle();
    store.dispatch(
      getSearchResult(
        props.data.searchKey,
        {
          filter: {
            type: "Books",
            limit: 20,
            attributes: props.data.filter,
          },
        },
        "books"
      )
    );
    store.dispatch({ type: LOADING_DATA });
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
              Filters
            </Typography>
          </React.Fragment>
        )}
      </div>
      <Divider />
      <Typography
        style={{ justifyContent: "end", paddingLeft: 10 }}
        className={classes.title}
        variant="h6"
        noWrap
      >
        Order By
      </Typography>
      <RadioGroup
        style={{ padding: 9 }}
        onChange={handleOrderChange}
        value={value}
      >
        <FormControlLabel
          value="none"
          control={<Radio select />}
          label="None"
        />
        <FormControlLabel
          value="alphabetical"
          control={<Radio />}
          label="Alphabetical"
        />
        <FormControlLabel
          value="ratings_count"
          control={<Radio />}
          label="Popularity"
        />
        <FormControlLabel
          value="price-high"
          control={<Radio />}
          label="Price (High to low)"
        />
        <FormControlLabel
          value="price-low"
          control={<Radio />}
          label="Price (Low to high)"
        />
      </RadioGroup>
      <Divider />
      <Typography
        style={{ justifyContent: "end", paddingLeft: 10 }}
        className={classes.title}
        variant="h6"
        noWrap
      >
        Ratings
      </Typography>
      <RadioGroup
        style={{ padding: 9 }}
        aria-label="gender"
        name="alphabetical"
        onChange={handleRatingChange}
        value={ratingValue}
      >
        <FormControlLabel value={`none`} control={<Radio />} label="All" />
        {[5, 4, 3, 2, 1].map((value) => (
          <FormControlLabel
            value={`average_rating-${value}-5`}
            control={<Radio />}
            label={<Rating name={"ratings"} readOnly value={value} />}
          />
        ))}
      </RadioGroup>
      <Divider />
      <Typography
        style={{ justifyContent: "end", paddingLeft: 10 }}
        className={classes.title}
        variant="h6"
        noWrap
      >
        Language
      </Typography>

      <TextField
        id="filled-select-currency"
        select
        fullWidth
        value={menuLanguage}
        SelectProps={{
          native: true,
        }}
        style={{
          marginTop: 10,
          marginBottom: 15,
          width: 221,
          "&:focus": {
            borderRadius: 0,
            backgroundColor: "rgb(255, 255, 255)",
          },
        }}
        variant="outlined"
        onChange={handleLanguageChange}
      >
        {" "}
        <option value={"all"}>All</option>
        {language.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </TextField>
      <Divider />
      <Typography
        style={{ justifyContent: "end", paddingLeft: 10 }}
        className={classes.title}
        variant="h6"
        noWrap
      >
        Authors
      </Typography>
      <SearchBar
        checkBox
        customStyle={{
          backgroundColor: "rgb(242 242 242)",
          borderColor: "#369fff38",
          borderStyle: "solid",
          marginBottom: "30%",
        }}
      />
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
const mapStateToProps = (state) => ({
  data: state.data,
});
export default withWidth()(connect(mapStateToProps, null)(UseTab));
