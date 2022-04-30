import { GET_ID } from "./idType";

const initialState = {
  id: 1,
};

const idReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ID:
      return {
        id: action.payload,
      };

    default:
      return state;
  }
};

export default idReducer;
