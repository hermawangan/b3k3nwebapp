import { combineReducers } from "redux";
import booksReducer from "./books/booksReducer";
import categoryReducer from "./Category/categoryReducer";
import idReducer from "./id/idReducer";

const rootReducer = combineReducers({
  categories: categoryReducer,
  books: booksReducer,
  id: idReducer,
});

export default rootReducer;
