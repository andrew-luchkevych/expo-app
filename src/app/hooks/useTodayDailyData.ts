import moment from "moment";
import { OneCallDailyWeather } from "@app/redux/entities/OneCall/types";
import { useMemo } from "react";
import { getFixedTimestamp } from "@app/utils/timestamp";

const empty: OneCallDailyWeather[] = [];
export const useTodayDailyData = (dailyData: null | OneCallDailyWeather[] = empty): null | OneCallDailyWeather => {
    const td = moment().format("YYYY-MM-DD");
    const todayData = useMemo(() => {
        return dailyData.find((d) => moment(getFixedTimestamp(d.dt)).format("YYYY-MM-DD") === td);
    }, [dailyData, td]);
    return todayData;
};

export default useTodayDailyData;
