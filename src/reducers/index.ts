// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import merge from "lodash/merge";
import { combineReducers } from "redux";
import * as ActionTypes from "../actions";
import paginate from "./paginate";

// Updates an entity cache in response to any action with response.entities.
export const entities = (state = { users: {}, repos: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
};

// Updates error message to notify about the failed fetches.
export const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return error;
  }

  return state;
};

// Updates the pagination data for different actions.
export const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: (action) => action.login,
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE,
    ],
  }),
  stargazersByRepo: paginate({
    mapActionToKey: (action) => action.fullName,
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE,
    ],
  }),
});
