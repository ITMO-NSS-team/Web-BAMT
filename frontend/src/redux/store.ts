import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { authAPI } from "../API/auth/authAPI";

import authReducer from "./auth/auth";
import experimentReducer from "./experiment/experiment";
import modelReducer from "./model/model";
import sampleReducer from "./sample/sample";

const rootReducer = combineReducers({
  auth: authReducer,
  model: modelReducer,
  experiment: experimentReducer,
  sample: sampleReducer,
  [authAPI.reducerPath]: authAPI.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupstore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(authAPI.middleware);
    },
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupstore>;
export type AppDispatch = AppStore["dispatch"];
