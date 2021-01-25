/* eslint-disable import/no-anonymous-default-export */
import { STOP_LOADING_UI, PAGE_INDEX } from "../type";
const initialState = {
  loading: false,
  errors: null,
  index: 1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PAGE_INDEX:
      return {
        ...state,
        index: action.payload,
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
