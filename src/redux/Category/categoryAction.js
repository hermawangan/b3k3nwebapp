import axios from "axios";
import {
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAIL,
} from "./categoryType";

const fetchCatReq = () => {
  return {
    type: FETCH_CATEGORY_REQUEST,
  };
};
const fetchCatSuccess = (category) => {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    payload: category,
  };
};

const fetchCatFail = (errorMsg) => {
  return {
    type: FETCH_CATEGORY_FAIL,
    payload: errorMsg,
  };
};

export const fetchCategory = () => {
  return (dispatch) => {
    dispatch(fetchCatReq);

    axios
      .get("fee-assessment-categories/")
      .then((response) => {
        const data = response.data;
        dispatch(fetchCatSuccess(data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchCatFail(errorMsg));
      });
  };
};
