/* eslint-disable import/no-anonymous-default-export */
import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  ERROR,
  MESSAGE,
  NOTIFICATIONS,
  USER_INFO,
  DEDUCT_BALANCE,
} from "../type";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  notifications: [],
  error: "",
  message: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };

    case NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state,
      };
    case ERROR:
      console.log("dispatching error", action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case DEDUCT_BALANCE:
      state.credentials.balance -= action.payload;
      console.log(state);
      return {
        ...state,
      };
    case MESSAGE:
      console.log("dispatching message", action.payload);
      return {
        ...state,
        message: action.payload,
      };

    case USER_INFO:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        userInformation: action.payload,
      };
    default:
      return state;
  }
}
