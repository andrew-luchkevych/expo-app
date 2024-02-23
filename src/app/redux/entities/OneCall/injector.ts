import api from "../../api";
import { OneCallRequestArgs, OneCallResponseType } from "./types";

export const InjectedOneCallApi = api.injectEndpoints({
    endpoints: (build) => ({
        oneCall: build.query<OneCallResponseType, OneCallRequestArgs>({
            query: (args) => ({
                url: "data/2.5/onecall",
                params: {
                    ...args,
                    exclude: "minutely",
                },
            }),
            keepUnusedDataFor: 3600, // seconds, one hour
        }),
    }),
});

export default InjectedOneCallApi;
