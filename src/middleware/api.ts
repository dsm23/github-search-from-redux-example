// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { normalize } from "normalizr";
import type { Schema } from "normalizr";
import { camelizeKeys } from "humps";

// Extracts the next page URL from Github API response.
const getNextPageUrl = (response: Response) => {
  const link = response.headers.get("link");
  if (!link) {
    return null;
  }

  const nextLink = link.split(",").find((s) => s.includes('rel="next"'));
  if (!nextLink) {
    return null;
  }

  return nextLink.trim().split(";")[0].slice(1, -1);
};

const API_ROOT = "https://api.github.com/";

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = async (endpoint: string, schema: Schema) => {
  const fullUrl = endpoint.includes(API_ROOT) ? endpoint : API_ROOT + endpoint;

  const response = await fetch(fullUrl);
  const json = await response.json();

  if (!response.ok) {
    return Promise.reject(json);
  }

  const camelizedJson = camelizeKeys(json);
  const nextPageUrl = getNextPageUrl(response);

  return {
    ...normalize(camelizedJson, schema),
    nextPageUrl,
  };
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = "Call API";

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === "undefined") {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { schema, types } = callAPI;

  if (typeof endpoint === "function") {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== "string") {
    throw new Error("Specify a string endpoint URL.");
  }
  if (!schema) {
    throw new Error("Specify one of the exported Schemas.");
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected an array of three action types.");
  }
  if (!types.every((type) => typeof type === "string")) {
    throw new Error("Expected action types to be strings.");
  }

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema).then(
    (response) =>
      next(
        actionWith({
          response,
          type: successType,
        }),
      ),
    (error) =>
      next(
        actionWith({
          type: failureType,
          error: error.message || "Something bad happened",
        }),
      ),
  );
};
