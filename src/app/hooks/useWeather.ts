import { useUnits } from "@app/services/Settings/store";
import { CityEntity } from "@app/redux/entities/Cities/types";
import OneCallApi from "@app/redux/entities/OneCall";

export const useWeather = (city: CityEntity) => {
    const units = useUnits();
    return OneCallApi.useOneCallQuery(
        {
            units,
            lat: city.lat,
            lon: city.lon,
        },
        {
            pollingInterval: 3300000, // 55 mins
        },
    );
};

export default useWeather;
