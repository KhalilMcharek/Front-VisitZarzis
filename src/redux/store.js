import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";

// 🔹 Define persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// 🔹 Combine reducers (if you have multiple slices)
const rootReducer = combineReducers({
  auth: authReducer,
});

// 🔹 Apply persistence to reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Configure store
const store = configureStore({
  reducer: persistedReducer, // Make sure this is defined
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To avoid "non-serializable value" warnings
    }),
});

// 🔹 Create persistor
export const persistor = persistStore(store);
export default store;
