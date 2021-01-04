import React, { Component } from "react";
import "./App.css";
import axios from "axios";

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
const theme = createMuiTheme(themeFile);
axios.defaults.baseURL =
  "https://asia-south1-exams-projects.cloudfunctions.net/api/hrmanagement";
const style = {
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
              <div className={this.props.classes.content}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={home}
                    width={this.props.width}
                  />
                  <Route
                    exact
                    path="/:page"
                    component={home}
                    width={this.props.width}
                  />
                  <Route exact path="/home/:page" component={home} />
                  <Route exact path="/user/:id" component={home} />
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
