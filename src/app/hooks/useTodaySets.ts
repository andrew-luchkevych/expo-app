import { OneCallDailyWeather } from "@app/redux/entities/OneCall/types";
import { useMemo } from "react";
import { WeatherViewProps } from "@app/components/CityView/weather";
import useTodayDailyData from "./useTodayDailyData";

const empty: OneCallDailyWeather[] = [];
export const useTodaySets = (dailyData: null | OneCallDailyWeather[] = empty) => {
    const todayData = useTodayDailyData(dailyData);
    const sets: null | WeatherViewProps["sets"] = useMemo(() => {
        if (!todayData) return null;
        return {
            sunset: todayData.sunset,
            moonset: todayData.moonset,
        };
    }, [todayData]);
    return sets;
};

export default useTodaySets;
