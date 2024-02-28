import type { Action, ThunkAction } from "@reduxjs/toolkit";
import configureStore from "../store/configureStore";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const store = configureStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
