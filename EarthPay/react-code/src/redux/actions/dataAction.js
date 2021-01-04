import {
  LOADING_DATA,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  TRANSACTIONS,
  USERS,
  NEW_PAYMENT,
  NEW_REQUEST,
  DEDUCT_BALANCE,
  GET_TRANSACTION,
} from "../type";
import axios from "axios";
import { logoutUser } from "./userAction";

export const getRecentTransactions = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get("/transactions?type=recent")
    .then((res) => {
      dispatch({
        type: TRANSACTIONS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: TRANSACTIONS,
        payload: [],
      });
    });
};

//get all transactions
export const getTransactions = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get("/transactions")
    .then((res) => {
      dispatch({
        type: TRANSACTIONS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch(CheckIfSessionExpired(error));
      dispatch({
        type: TRANSACTIONS,
        payload: [],
      });
    });
};

//get recent contacts
export const getRecentContacts = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get("/users")
    .then((res) => {
      dispatch({
        type: USERS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch(CheckIfSessionExpired(error));
      dispatch({
        type: USERS,
        payload: [],
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

//send payment
export const sendPayment = (data) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/transaction", data)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      console.log("message action", res.data.message);
      dispatch({
        type: NEW_PAYMENT,
        payload: {
          transData: {
            mobilenumber: res.data.mobilenumber,
            username: res.data.username,
            message: res.data.message,
            code: 200,
            status: "success",
            amount: res.data.amount,
            tid: res.data.tid,
          },
        },
      });
      dispatch({ type: DEDUCT_BALANCE, payload: res.data.amount });
    })
    .catch((err) => {
      dispatch(CheckIfSessionExpired(err));
      let error;
      if (err.response.data.errors) error = err.response.data.errors;
      else error = err.response.data;
      if (err.response.status === 500)
        dispatch({
          type: NEW_PAYMENT,
          payload: {
            transData: { message: error, code: 500, status: "failed" },
          },
        });
      else
        dispatch({
          type: SET_ERRORS,
          payload: error,
        });
    });
};
//send payment request
export const sendPaymentRequest = (data) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/transaction/request", data)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      console.log(res.data);
      dispatch({
        type: NEW_REQUEST,
        payload: {
          transData: {
            message: res.data.message,
            code: 200,
            status: "success",
          },
        },
      });
    })
    .catch((err) => {
      dispatch(CheckIfSessionExpired(err));
      let error;
      if (err.response.data.errors) error = err.response.data.errors;
      else error = err.response.data;
      console.log(error);
      if (err.response.status === 500)
        dispatch({
          type: NEW_REQUEST,
          payload: {
            transData: { message: error, code: 500, status: "failed" },
          },
        });
      else
        dispatch({
          type: SET_ERRORS,
          payload: error,
        });
    });
};
//get transaction info
//get old screens

export const getTransactionDetails = (tid) => (dispatch) => {
  dispatch({ type: GET_TRANSACTION, payload: { loading: "loading" } });
  axios
    .get(`/transaction/${tid}`)
    .then((res) => {
      dispatch({
        type: GET_TRANSACTION,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch(CheckIfSessionExpired(error));
      dispatch({
        type: GET_TRANSACTION,
        payload: error.response.data,
      });
    });
};
//check if token expired
const CheckIfSessionExpired = (error) => (dispatch) => {
  try {
    if (
      error.response.data.code &&
      error.response.data.code === "auth/id-token-expired"
    ) {
      if (localStorage.getItem("uid")) localStorage.removeItem("uid");
      dispatch(logoutUser);
    }
  } catch (e) {}
};
