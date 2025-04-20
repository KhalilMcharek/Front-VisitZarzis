import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import activitiesReducer from "./slices/activitiesSlice";
import reservationReducer from "./slices/reservationsSlice";    

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer, activities: activitiesReducer, reservations: reservationReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
    
});

export const persistor = persistStore(store);
export default store;
