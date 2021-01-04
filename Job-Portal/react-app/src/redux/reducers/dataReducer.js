import {
  LOADING_DATA,
  STOP_LOADING_DATA,
  SEARCH_DATA,
  ADD_STATUS,
  PAGE_INDEX,
  STATUS_CHANGING,
  SEARCH_ACTIVE,
  SEARCH_INACTIVE,
} from "../type";
const initialState = {
  loading: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, actions) {
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_ACTIVE:
      return {
        ...state,
        search: true,
      };
    case SEARCH_INACTIVE:
      return {
        ...state,
        search: false,
      };
    case SEARCH_DATA:
      return {
        ...state,
        searchResult: actions.payload,
      };
    case STOP_LOADING_DATA:
      return {
        ...state,
        loading: false,
      };
    case PAGE_INDEX:
      return {
        ...state,
        index: actions.payload,
      };
    case STATUS_CHANGING:
      return {
        ...state,
        changingStatus: actions.payload,
      };

    case ADD_STATUS:
      let user = state.user;
      user.status = actions.payload;
      return {
        ...state,
        changingStatus: null,
        user,
      };
    default:
      return {
        ...state,
        loading: false,
        ...actions.payload,
      };
  }
}
