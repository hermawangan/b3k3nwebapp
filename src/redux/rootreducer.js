import { combineReducers } from "redux";
import booksReducer from "./books/booksReducer";
import categoryReducer from "./Category/categoryReducer";

const rootReducer = combineReducers({
  categories: categoryReducer,
  books: booksReducer,
});

export default rootReducer;
