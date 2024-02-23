import WeatherIcon from "@app/components/WeatherIcon";
import { OneCallDailyWeather } from "@app/redux/entities/OneCall/types";
import { getFixedTimestamp } from "@app/utils/timestamp";
import { Text } from "@gluestack-ui/themed";
import { Box, HStack } from "@gluestack-ui/themed";
import moment from "moment";
import { memo } from "react";
import TempView from "./TempView";

export interface ListItemProps {
    data: OneCallDailyWeather;
    minRangeTemp: number;
    maxRangeTemp: number;
}

export const ListItem = memo((props: ListItemProps) => {
    const { data, minRangeTemp, maxRangeTemp } = props;
    const weather = data.weather[0];
    const dt = moment(getFixedTimestamp(data.dt));
    const isToday = moment().format("YYYY-MM-DD") === dt.format("YYYY-MM-DD");
    return (
        <Box
            borderBottomWidth="$1"
            borderColor="$trueGray800"
            $dark-borderColor="$trueGray100"
            $base-pl={0}
            $base-pr={0}
            $sm-pl="$4"
            $sm-pr="$5"
            py="$2"
        >
            <HStack space="md" justifyContent="space-between" alignItems="center">
                <Box width={50}>
                    <Text>{isToday ? "Today" : dt.format("dd")}</Text>
                </Box>
                <WeatherIcon
                    code={weather.id}
                    description={weather.description}
                    style={{ width: 70, height: 60 }}
                    resizeMode="contain"
                />
                <Box flex={1}>
                    <TempView
                        minTemp={data.temp.min}
                        maxTemp={data.temp.max}
                        minRangeTemp={minRangeTemp}
                        maxRangeTemp={maxRangeTemp}
                    />
                </Box>
            </HStack>
        </Box>
    );
});

export default ListItem;
