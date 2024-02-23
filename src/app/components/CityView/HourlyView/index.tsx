import { OneCallHourlyWeather } from "@app/redux/entities/OneCall/types";
import { Heading, ScrollView, View } from "@gluestack-ui/themed";
import Item from "./item";
import DataCard from "@app/components/DataCard";
import { useMemo } from "react";
import moment from "moment";
import { getFixedTimestamp } from "@app/utils/timestamp";

export interface HourlyViewProps {
    data: OneCallHourlyWeather[];
}

export const HourlyView = (props: HourlyViewProps) => {
    const { data } = props;
    const min = +moment().startOf("hour");
    const max = +moment().add(12, "hour").endOf("hour");
    const filtered = useMemo(
        () =>
            data.filter((d) => {
                const ts = getFixedTimestamp(d.dt);
                return ts >= min && ts <= max;
            }),
        [min, max],
    );
    return (
        <DataCard>
            <Heading size="lg" pb="$2">
                Hourly
            </Heading>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {filtered.map((d) => (
                    <Item data={d} key={d.dt} />
                ))}
            </ScrollView>
        </DataCard>
    );
};

export default HourlyView;
