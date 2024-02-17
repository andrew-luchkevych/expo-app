import api from "../../api";
import { GetWeatherRequestArgs, GetWeatherResponseType } from "./types";

export const InjectedWeatherApi = api.injectEndpoints({
    endpoints: (build) => ({
        getWeather: build.query<GetWeatherResponseType, GetWeatherRequestArgs>({
            query: (args) => ({
                url: "/data/2.5/weather",
                params: {
                    ...args,
                },
            }),
        }),
    }),
});

export default InjectedWeatherApi;
