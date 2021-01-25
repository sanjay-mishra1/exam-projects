import React, { Component } from "react";
import "./App.css";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ThemeProvider as MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
//pages
import home from "./pages/home";

//Components
import Navbar from "./components/Navbar";
import withWidth from "@material-ui/core/withWidth";
import cart from "./pages/cart";
import axios from "axios";
const theme = createMuiTheme(themeFile);
axios.defaults.baseURL =
  "https://asia-south1-exams-projects.cloudfunctions.net/api/bookrepo";
const style = {
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(8),
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(7),
    },
  },
};
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <div className={this.props.classes.root}>
              <Navbar props={this.props} width={this.props.width} />
              <br />
              <div className={this.props.classes.content}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={home}
                    width={this.props.width}
                  />

                  <Route exact path="/book/:bookId" component={home} />
                  <Route exact path="/author/:author" component={home} />
                  <Route exact path="/authors" component={home} />
                  <Route exact path="/books" component={home} />
                  <Route exact path="/cart" component={cart} />
                </Switch>
              </div>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default withWidth()(withStyles(style)(App));
