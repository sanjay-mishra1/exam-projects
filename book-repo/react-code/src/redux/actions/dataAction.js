import axios from "axios";
import {
  LOADING_DATA,
  SEARCH_DATA,
  SET_BOOKS,
  SET_AUTHORS,
  SET_BOOK,
  SET_AUTHOR,
  STOP_LOADING_DATA,
} from "../type";

export const getBooks = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get("/books")
    .then((res) => {
      dispatch({
        type: SET_BOOKS,
        payload: res.data.books,
      });
      dispatch({
        type: STOP_LOADING_DATA,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SET_BOOKS,
        payload: [],
      });
      dispatch({
        type: STOP_LOADING_DATA,
      });
    });
};
export const getBook = (bookId) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });

  axios
    .get(`/book/${bookId}`)
    .then((res) => {
      dispatch({
        type: SET_BOOK,
        payload: res.data,
      });
      dispatch({
        type: STOP_LOADING_DATA,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SET_BOOK,
        payload: [],
      });
      dispatch({
        type: STOP_LOADING_DATA,
      });
    });
};
export const getAuthors = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });

  axios
    .get("/authors")
    .then((res) => {
      dispatch({
        type: SET_AUTHORS,
        payload: res.data.authors,
      });
      dispatch({
        type: STOP_LOADING_DATA,
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_AUTHORS,
        payload: [],
      });
      dispatch({
        type: STOP_LOADING_DATA,
      });
    });
};
export const getAuthor = (authorName) => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });

  axios
    .get(`/author/${authorName}`)
    .then((res) => {
      dispatch({
        type: SET_AUTHOR,
        payload: res.data,
      });
      dispatch({
        type: STOP_LOADING_DATA,
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_AUTHOR,
        payload: [],
      });
      dispatch({
        type: STOP_LOADING_DATA,
      });
    });
};

export const getSearchResult = (query, filter, from) => (dispatch) => {
  if (!query && query === "") return;

  axios
    .post(`/search/${query}`, filter)
    .then((res) => {
      dispatch({
        type: from ? SET_BOOKS : SEARCH_DATA,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: from ? SET_BOOKS : SEARCH_DATA,
        payload: [],
      });
    });
};
