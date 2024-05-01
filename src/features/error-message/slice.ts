import { createSlice } from "@reduxjs/toolkit";
import type { Action } from "@reduxjs/toolkit";

export type ErrorState = {
  value: string | Error | null;
};

const initialState: ErrorState = {
  value: null,
};

interface RejectedAction extends Action {
  error: Error;
}

function isRejectedAction(action: Action): action is RejectedAction {
  return action.type.endsWith("FAILURE");
}

export const errorMessageSlice = createSlice({
  name: "errorMessage",
  initialState,
  reducers: {
    resetErrorMessage: (state: ErrorState) => {
      state.value = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRejectedAction, (state, action) => {
      state.value = action.error;
    });
  },
  selectors: {
    errorMessageSelector: (state) => state.value,
  },
});

export const { resetErrorMessage } = errorMessageSlice.actions;
export const { errorMessageSelector } = errorMessageSlice.selectors;

export default errorMessageSlice.reducer;
