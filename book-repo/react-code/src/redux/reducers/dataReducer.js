import {
  LOADING_DATA,
  STOP_LOADING_DATA,
  SEARCH_DATA,
  PAGE_INDEX,
  SEARCH_ACTIVE,
  SEARCH_INACTIVE,
  SET_AUTHOR,
  SET_AUTHORS,
  SET_BOOKS,
  SET_BOOK,
  SET_FILTER,
} from "../type";
const initialState = {
  loading: false,
  author: {},
  book: {},
  filter: [],
  page: "books",
};
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, actions) {
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_FILTER: {
      var filter = state.filter;
      if (actions.payload.value === "none" || actions.payload.previous) {
        const index = filter.indexOf(actions.payload.previous);
        if (index > -1) {
          filter.splice(index, 1);
        }
      }
      if (actions.payload.value !== "none") filter.push(actions.payload.value);

      return {
        ...state,
        filter: filter,
        searchKey: actions.payload.searchKey,
      };
    }
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
        page: actions.payload,
      };
    case SET_AUTHOR: {
      return {
        ...state,
        author: actions.payload,
      };
    }
    case SET_AUTHORS: {
      return {
        ...state,
        authors: actions.payload,
      };
    }
    case SET_BOOKS:
      return {
        ...state,
        books: actions.payload,
        loading: false,
      };
    case SET_BOOK:
      return {
        ...state,
        book: actions.payload,
      };

    default:
      return {
        ...state,
        loading: false,
        ...actions.payload,
      };
  }
}
