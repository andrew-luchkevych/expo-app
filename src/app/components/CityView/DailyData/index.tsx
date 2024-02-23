import { OneCallDailyWeather } from "@app/redux/entities/OneCall/types";
import { FlatList, Heading, View } from "@gluestack-ui/themed";
import { memo } from "react";
import ListItem from "./ListItem";
import DataCard from "@app/components/DataCard";

export interface DailyDataProps {
    dailyData: null | OneCallDailyWeather[];
}

export const DailyData = memo((props: DailyDataProps) => {
    const { dailyData } = props;
    if (!dailyData) return null;

    const { min, max } = dailyData.reduce(
        (acc, v) => {
            if (v.temp.min < acc.min) acc.min = v.temp.min;
            if (v.temp.max > acc.max) acc.max = v.temp.max;
            return acc;
        },
        { min: 10000, max: -10000 },
    );
    return (
        <DataCard>
            <Heading size="lg" pb="$2">
                Next days
            </Heading>
            {dailyData.map((d) => (
                <ListItem minRangeTemp={min} maxRangeTemp={max} data={d} key={d.dt} />
            ))}
        </DataCard>
    );
});

export default DailyData;
