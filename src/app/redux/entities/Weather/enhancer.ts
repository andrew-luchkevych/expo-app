import InjectedWeatherApi from "./injector";
import { GetWeatherRequestArgs } from "./types";

export const type = "Weather";

const getWeatherId = (args: GetWeatherRequestArgs) => {
    return `${args.lat}${args.lon}_${args.units}`;
};

export const WeatherApi = InjectedWeatherApi.enhanceEndpoints({
    addTagTypes: [type],
    endpoints: {
        getWeather: {
            providesTags: (response, error, args) => [{ type, id: getWeatherId(args) }],
        },
    },
});

export default WeatherApi;
