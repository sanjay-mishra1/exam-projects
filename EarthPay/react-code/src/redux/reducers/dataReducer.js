import {
  // SET_SCREENS,
  // LIKE_SCREEN,
  // UNLIKE_SCREEN,
  LOADING_DATA,
  // DELETE_SCREEN,
  // POST_SCREEN,
  // SET_SCREEN,
  // SUBMIT_COMMENT,
  // SEARCH_DATA,
  // NEWS_DATA,
  // FOLLOW_LIST,
  // FOLLOW_SUGGESTIONS,
  // SET_MEDIA,
  // ADD_POLL_RESPONSE,
  RECENT_TRANSACTIONS,
  TRANSACTIONS,
  USERS,
  STOP_LOADING_DATA,
  NEW_PAYMENT,
  NEW_REQUEST,
  CLEAR_NEW_PAYMENT,
  CLEAR_NEW_REQUEST,
  GET_TRANSACTION,
  CLEAR_TRANSACTION,
} from "../type";
const initialState = {
  // screens: [],
  // screen: {},
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
    case STOP_LOADING_DATA:
      return {
        ...state,
        loading: false,
      };

    case RECENT_TRANSACTIONS:
      return {
        ...state,
        loading: false,
        recentTransaction: actions.payload,
      };
    case TRANSACTIONS:
      return {
        ...state,
        loading: false,
        transactions: actions.payload,
      };
    case USERS:
      return {
        ...state,
        loading: false,
        users: actions.payload,
      };
    case NEW_PAYMENT:
      console.log("new pay", actions.payload, state);
      return {
        ...state,
        ...actions.payload,
      };
    case NEW_REQUEST:
      return {
        ...state,
        ...actions.payload,
      };
    case CLEAR_NEW_PAYMENT:
      return {
        ...state,
        transData: {},
      };
    case CLEAR_NEW_REQUEST:
      return {
        ...state,
        transData: {},
      };
    case GET_TRANSACTION:
      return {
        ...state,
        transaction: { ...actions.payload },
      };
    case CLEAR_TRANSACTION:
      return {
        ...state,
        transaction: null,
      };
    default:
      return state;
  }
}
