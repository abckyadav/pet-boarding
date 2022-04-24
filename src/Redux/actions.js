import axios from "axios";
import * as types from "./actionTypes";

const getData = (pets) => {
  type: types.GET_DATA;
  payload: pets;
};

const addData = () => ({
  type: types.ADD_DATA,
});

const singleData = (singlePet) => ({
  type: types.SINGLE_DATA,
  payload: singlePet,
});

export const getPets = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        console.log("res:", res);
        dispatch(getData(res.data));
      })
      .catch((err) => console.log("error:", err));
  };
};

export const postPet = (data) => {
  return function (dispatch) {
    axios
      .post("http://localhost:5000/users", data)
      .then((res) => {
        console.log("res:", res);
        dispatch(addData());
        dispatch(getPets());
      })
      .catch((err) => console.log("error", err));
  };
};

export const getSinglePet = (id) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:5000/users${id}`)
      .then((res) => {
        console.log("res:", res);
        dispatch(singleData());
      })
      .catch((err) => console.log("error", err));
  };
};
