import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  MARK_NOTIFICATIONS_READ,
  LOADING_DATA,
  NOTIFICATIONS,
  USER_INFO,
  STOP_LOADING_DATA,
} from "../type";
import axios from "axios";
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      localStorage.setItem("uid", "waiting");
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      let error;
      if (err.response.data.errors) error = err.response.data.errors;
      else error = err.response.data;
      console.log(error);
      dispatch({
        type: SET_ERRORS,
        payload: error,
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      localStorage.setItem("uid", "waiting");

      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      let error;
      if (err.response.data.errors) error = err.response.data.errors;
      else error = err.response.data;
      dispatch({
        type: SET_ERRORS,
        payload: error,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  console.log("logout user");
  localStorage.removeItem("FBIdToken");
  localStorage.removeItem("uid");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  if (
    window.location.href.includes !== "login" ||
    window.location.href.includes !== "signup"
  )
    window.location.href = "/login";
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/user")
    .then((res) => {
      localStorage.setItem("uid", res.data.credentials.uid);
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      try {
        if (
          err.response.data.code &&
          err.response.data.code === "auth/id-token-expired"
        ) {
          if (localStorage.getItem("uid")) localStorage.removeItem("uid");
          // dispatch({ type: SET_UNAUTHENTICATED });
          dispatch(logoutUser());
        }
      } catch (e) {}
      console.log(err);
    });
};
export const getUserPersonalData = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get("/user?type=personal")
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: USER_INFO,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_DATA });
    })
    .catch((err) => {
      try {
        if (
          err.response.data.code &&
          err.response.data.code === "auth/id-token-expired"
        ) {
          if (localStorage.getItem("uid")) localStorage.removeItem("uid");
          // dispatch({ type: SET_UNAUTHENTICATED });
          dispatch(logoutUser());
        }
      } catch (e) {}
      dispatch({ type: STOP_LOADING_DATA });
      console.log(err);
    });
};
export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post("/notifications", notificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
      });
    })
    .catch((err) => console.log(err));
};

export const getNotifications = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  console.log("notification");
  axios
    .get("/notifications")
    .then((res) => {
      dispatch({
        type: NOTIFICATIONS,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_DATA });
    })
    .catch((error) => {
      dispatch({
        type: NOTIFICATIONS,
        payload: [],
      });
      dispatch({ type: STOP_LOADING_DATA });
    });
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
