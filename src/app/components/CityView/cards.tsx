import { View } from "@gluestack-ui/themed";
import { useUnits } from "@app/services/Settings/store";
import Card from "./card";
import { OneCallWeatherBase, UNITS } from "@app/redux/entities/OneCall/types";

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
    data: Pick<
        OneCallWeatherBase,
        "humidity" | "pressure" | "visibility" | "uvi" | "wind_deg" | "wind_gust" | "wind_speed"
    >;
    mode: "full" | "partial";
}
export const WeatherCards = (props: TemperatureViewProps) => {
    const {
        data: { humidity, pressure, visibility, uvi, wind_deg, wind_gust, wind_speed },
        mode,
    } = props;
    const units = useUnits();
    return (
        <View flexDirection="row" justifyContent="flex-start" flexWrap="wrap" pt="$4" pb="$4">
            {mode === "full" && (
                <>
                    <Card title="UVI index" value={`${Math.round(uvi)}`} />
                    <Card title="humidity" value={`${humidity}%`} />
                    <Card title="pressure" value={`${pressure} hPa`} />
                </>
            )}
            <Card title="visibility" value={getVisibility(visibility, units)} />
            <Card title="wind" value={`${wind_speed} ${getWindSpeed(units)}`} />
        </View>
    );
};

export default WeatherCards;
