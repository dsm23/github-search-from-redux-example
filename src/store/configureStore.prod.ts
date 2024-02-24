// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import api from "../middleware/api";
import rootReducer from "../reducers";

const configureStore = (preloadedState) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk, api));

export default configureStore;
