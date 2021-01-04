import axios from "axios";
import {
  ALL_USERS,
  LOADING_DATA,
  SEARCH_DATA,
  USER_INFO,
  ADD_STATUS,
  STATUS_CHANGING,
} from "../type";

export const getSearchResult = (query) => (dispatch) => {
  if (!query && query === "") return;

  axios
    .get(`/search/${query}`)
    .then((res) => {
      dispatch({
        type: SEARCH_DATA,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: SEARCH_DATA,
        payload: [],
      });
    });
};
export const getAllUsers = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  var data = {};
  axios
    .get("/users")
    .then((res) => {
      data["users"] = res.data;
      dispatch({
        type: ALL_USERS,
        payload: data,
      });
    })
    .catch((error) => {
      data["users"] = [];
      dispatch({
        type: ALL_USERS,
        payload: data,
      });
    });
};

export const getUsers = (type) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get(`/users/${type}`)
    .then((res) => {
      var data = {};
      data[type] = res.data;
      dispatch({
        type: ALL_USERS,
        payload: data,
      });
    })
    .catch((error) => {
      var data = {};
      data[type] = [];
      dispatch({
        type: ALL_USERS,
        payload: data,
      });
    });
};

export const getUserDetail = (id) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get(`/user/${id}`)
    .then((res) => {
      var data = {};
      data["user"] = res.data;
      dispatch({
        type: USER_INFO,
        payload: data,
      });
    })
    .catch((error) => {
      var data = {};
      data["user"] = [];
      dispatch({
        type: USER_INFO,
        payload: data,
      });
    });
};

export const addUserStatus = (id, status, history) => (dispatch) => {
  dispatch({
    type: STATUS_CHANGING,
    payload: status.status,
  });
  axios
    .post(`/user/${id}`, status)
    .then((res) => {
      dispatch({
        type: ADD_STATUS,
        payload: status.status,
      });
      setTimeout(function () {
        history.push("/home");
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: ADD_STATUS,
        payload: null,
      });
    });
};
