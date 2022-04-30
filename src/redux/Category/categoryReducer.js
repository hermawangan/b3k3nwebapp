import {
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAIL,
} from "./categoryType";

const initialState = {
  loading: true,
  categories: [],
  errorMsg: "",
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        errorMsg: "",
      };

    case FETCH_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        categories: [],
        errorMsg: action.payload,
      };

    default:
      return state;
  }
};

export default categoryReducer;
