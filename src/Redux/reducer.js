import * as types from "./actionTypes";

const init = {
  pets: [],
  pet: {},
  loading: true,
};

const petReducer = (state = init, action) => {
  switch (action.type) {
    case types.GET_DATA:
      return {
        ...state,
        pets: action.payload,
        loading: false,
      };
    case types.SINGLE_DATA:
      return {
        ...state,
        pet: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default petReducer;
