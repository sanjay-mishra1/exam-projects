import React, { Component } from "react";
import "./App.css";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./redux/type";
import { logoutUser, getUserData } from "./redux/actions/userAction";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import themeFile from "./util/theme";
import AuthRoute from "./util/AuthRoute";
//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
//Components
import Navbar from "./components/layout/Navbar";
import axios from "axios";
import withWidth from "@material-ui/core/withWidth";
import payment from "./pages/payment";
import requestPayment from "./pages/requestPayment";
const theme = createMuiTheme(themeFile);
axios.defaults.baseURL =
  "https://asia-south1-earth-payment.cloudfunctions.net/api";
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  let time = decodedToken.esp;
  if (time * 1000 < Date.now() || !localStorage.getItem("uid")) {
    //token expire redirect to login
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
} else localStorage.removeItem("uid");
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar props={this.props} width={this.props.width} />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={home}
                  width={this.props.width}
                />
                <Route exact path="/transaction/:tid" component={home} />
                <Route exact path="/home/:index" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/pay" component={payment} />
                <Route exact path="/request/" component={requestPayment} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default withWidth()(App);
