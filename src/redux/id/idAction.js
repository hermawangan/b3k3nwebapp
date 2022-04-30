import { GET_ID } from "./idType";

export const getId = (id = 1) => {
  return {
    type: GET_ID,
    payload: id,
  };
};
