import axios from "axios";
import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAIL,
} from "./booksType";

const fetchBooksReq = () => {
  return {
    type: FETCH_BOOKS_REQUEST,
  };
};

const fetchBooksSuccess = (books) => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    payload: books,
  };
};

const fetchBooksFail = (error) => {
  return {
    type: FETCH_BOOKS_FAIL,
    payload: error,
  };
};

export const fetchBooks = () => {
  return (dispatch) => {
    dispatch(fetchBooksReq);
    axios
      .get("fee-assessment-books/?categoryId=1")
      .then((response) => {
        const data = response.data;
        dispatch(fetchBooksSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchBooksFail(errorMsg));
      });
  };
};
