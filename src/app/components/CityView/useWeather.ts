import { useUnits } from "@app/services/Settings/store";
import { CityEntity } from "@app/redux/entities/Cities/types";
import WeatherApi from "@app/redux/entities/Weather";

export const useWeather = (city: CityEntity) => {
    const units = useUnits();
    return WeatherApi.useGetWeatherQuery({
        units,
        lat: city.lat,
        lon: city.lon,
        exclude: "minutely",
    });
};

export default useWeather;
