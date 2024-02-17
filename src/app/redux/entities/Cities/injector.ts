import api from "../../api";
import { FindCityArgs, FindCityResponse } from "./types";

export const InjectedCitiesApi = api.injectEndpoints({
    endpoints: (build) => ({
        findCity: build.query<FindCityResponse, FindCityArgs>({
            query: (args) => ({
                url: "/geo/1.0/direct",
                params: {
                    q: args.query,
                    limit: args.limit || 5,
                },
            }),
        }),
    }),
});

export default InjectedCitiesApi;
