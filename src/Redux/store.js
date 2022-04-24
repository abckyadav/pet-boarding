import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer";
import reduxThunk from "redux-thunk";
import logger from "redux-logger";

const middlewares = [reduxThunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
