import { View } from "@gluestack-ui/themed";
import { UNITS, Weather } from "@app/redux/entities/Weather/types";
import { useUnits } from "@app/services/Settings/store";
import Card from "./card";

const getWindSpeed = (units: UNITS) => {
    switch (units) {
        case UNITS.imperial:
            return "mi/h";
        default:
            return "m/s";
    }
};

const metersToMiles = (m: number) => Number((m * 0.000621371192).toFixed(1));
const metersToYards = (m: number) => Number((m * 1.0936133).toFixed(1));
const getVisibility = (m: number, units: UNITS) => {
    return units === UNITS.imperial
        ? m < 1610
            ? `${metersToYards(m)} yd`
            : `${metersToMiles(m)} mi`
        : m > 1000
          ? `${Number((m / 1000).toFixed(1))} km`
          : `${m} m`;
};

export interface TemperatureViewProps {
    data: Weather["main"];
    visibility: Weather["visibility"];
    wind?: Weather["wind"];
}
export const WeatherCards = (props: TemperatureViewProps) => {
    const { data, wind, visibility } = props;
    const units = useUnits();
    return (
        <View flexDirection="row" justifyContent="flex-start" flexWrap="wrap" pt="$8">
            <Card title="humidity" value={`${data.humidity}%`} />
            <Card title="pressure" value={`${data.pressure} hPa`} />
            {wind && <Card title="wind" value={`${wind.speed} ${getWindSpeed(units)}`} />}
            <Card title="visibility" value={getVisibility(visibility, units)} />
        </View>
    );
};

export default WeatherCards;
