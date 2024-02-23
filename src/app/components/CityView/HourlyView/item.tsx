import WeatherIcon from "@app/components/WeatherIcon";
import { OneCallHourlyWeather } from "@app/redux/entities/OneCall/types";
import { useUnits } from "@app/services/Settings/store";
import { getTemperatureSign } from "@app/utils/temperature";
import { getFixedTimestamp } from "@app/utils/timestamp";
import { Text } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import moment from "moment";

export interface ItemProps {
    data: OneCallHourlyWeather;
}

export const Item = (props: ItemProps) => {
    const { data } = props;
    const units = useUnits();
    const h = moment(getFixedTimestamp(data.dt)).format("HH");
    const weather = data.weather[0];
    return (
        <VStack space="sm" width={60} alignItems="center">
            <Text textAlign="center">{h}</Text>
            <WeatherIcon
                code={weather.id}
                description={weather.description}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
            />
            <Text textAlign="center">{`${Math.round(data.temp)} ${getTemperatureSign(units)}`}</Text>
        </VStack>
    );
};

export default Item;
