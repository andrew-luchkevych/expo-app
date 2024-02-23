import { Action } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { stripUndefined } from "@app/utils/query";

type RootState = any; // normally inferred from state

export const API_KEY = "api";

function isHydrateAction(action: Action): action is Action<typeof REHYDRATE> & {
    key: string;
    payload: RootState;
    err: unknown;
} {
    return action.type === REHYDRATE;
}

export const api = createApi({
    reducerPath: API_KEY,
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            headers.set("accept", "application/json");
            return headers;
        },
        paramsSerializer: (params = {}) =>
            new URLSearchParams(stripUndefined({ ...params, appid: process.env.EXPO_PUBLIC_API_KEY })).toString(),
    }),
    // to prevent circular type issues, the return type needs to be annotated as any
    extractRehydrationInfo(action, { reducerPath }): any {
        if (isHydrateAction(action)) {
            // when persisting the api reducer
            if (action.key === API_KEY) {
                return action.payload;
            }

            // When persisting the root reducer
            return action.payload[reducerPath];
        }
    },
    endpoints: () => ({}),
    keepUnusedDataFor: 604800, // 7 days in seconds
});

export default api;
