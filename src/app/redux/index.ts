import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import api, { API_KEY } from "./api";

const persistConfig = {
    key: API_KEY,
    storage: AsyncStorage,
};

const percictedReducer = persistReducer(persistConfig, api.reducer);
export const store = configureStore({
    reducer: {
        [api.reducerPath]: percictedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(api.middleware),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
