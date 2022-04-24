import { combineReducers } from "redux";
import petReducer from "./reducer";

const rootReducer = combineReducers({
  data: petReducer,
});

export default rootReducer;
