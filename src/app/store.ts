import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import logger from "redux-logger";
import api from "~/middleware/api";
import DevTools from "~/containers/DevTools";
import { entities, pagination } from "~/reducers";
import errorMessage from "~/features/error-message/slice";

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: false,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api, logger),
    // enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(offline(offlineConfig)),
    enhancers: (getDefaultEnhancers) =>
      getDefaultEnhancers().concat(DevTools.instrument()),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
