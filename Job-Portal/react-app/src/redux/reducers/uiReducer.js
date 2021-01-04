/* eslint-disable import/no-anonymous-default-export */
import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  PAGE_INDEX,
} from "../type";
const initialState = {
  loading: false,
  errors: null,
  index: 1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case PAGE_INDEX:
      return {
        ...state,
        index: action.payload,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
