import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import compressedStorage from "./compressedStorage.js";

const rootReducer = combineReducers({ user: userSlice, product: productSlice });

const persistConfig = {
  key: 'root',
  storage, 
  version: 1,
  whitelist: ['user'], 
    // blacklist: ['product'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// store.subscribe(() => {
//   const state = store.getState();
//   console.log('State Size:', JSON.stringify(state).length);
// }
// );
