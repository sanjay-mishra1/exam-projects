import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import dataReducer from "./reducers/dataReducer";
import uiReducer from "./reducers/uiReducer";
import { environment } from "../config.json";
const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  data: dataReducer,
  UI: uiReducer,
});

const composeEnhancers =
  environment !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
