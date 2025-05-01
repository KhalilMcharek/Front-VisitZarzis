import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import activitiesReducer from "./slices/activitiesSlice";
import reservationReducer from "./slices/reservationsSlice";

// 1. Config for only the `auth` slice
const authPersistConfig = {
  key: "auth",
  storage,
};

// 2. Combine reducers, with `auth` wrapped in `persistReducer`
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer), // only auth is persisted
  activities: activitiesReducer,
  reservations: reservationReducer,
});

// 3. Create the store with the root reducer
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// 4. Create the persistor (for <PersistGate>)
export const persistor = persistStore(store);
export default store;
