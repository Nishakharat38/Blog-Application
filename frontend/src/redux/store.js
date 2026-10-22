import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import themeSlice from "./themeSlice.js";
import blogSlice from "./blogSlice.js";
import commentSlice from "./commentSlice.js"
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const storage = {
    getItem: async (key) => {
        return localStorage.getItem(key);
    },
    setItem: async (key, value) => {
        localStorage.setItem(key, value);
    },
    removeItem: async (key) => {
        localStorage.removeItem(key);
    },
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
  blog: blogSlice,
  comment:commentSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
