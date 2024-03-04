import { configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import logger from "redux-logger";
import api from "~/middleware/api";
import rootReducer from "~/reducers";
import DevTools from "~/containers/DevTools";

const store = configureStore({
  reducer: rootReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api, logger),
  // enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(offline(offlineConfig)),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(DevTools.instrument()),
});

export { store };

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
