import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAIL,
} from "./booksType";

const initialState = {
  loading: true,
  books: [],
  errorMsg: "",
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
        books: [],
        errorMsg: ''
      };

    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload,
        errorMsg: "",
      };

    case FETCH_BOOKS_FAIL:
      return {
        ...state,
        loading: false,
        books: [],
        errorMsg: action.payload,
      };

    default:
      return state;
  }
};

export default booksReducer;
