import { Heading, ScrollView, Spinner, View, Text } from "@gluestack-ui/themed";
import { useWindowWidth } from "../DimensionsProvider/store";
import { memo } from "react";
import { CityEntity } from "@app/redux/entities/Cities/types";
import useWeather from "./useWeather";
import WeatherView from "./weather";
import TemperatureView from "./temperature";
import WeatherCards from "./cards";

export interface CityViewProps {
    city: CityEntity;
}
export const CityView = memo((props: CityViewProps) => {
    const { city } = props;
    const width = useWindowWidth();
    const { data, isLoading, isError } = useWeather(city);

    const description = data?.weather?.[0]?.description || null;
    return (
        <ScrollView width={width} p="$4">
            <Heading size="2xl" pb="$2" textAlign="center">
                {city.name}
            </Heading>
            {isLoading && (
                <View justifyContent="center">
                    <Spinner size="large" />
                </View>
            )}
            {isError && (
                <View py="$4" px="$2">
                    <Text>Sorry, looks like we can not load wether for this city for you.</Text>
                </View>
            )}
            {data && (
                <>
                    {description && <WeatherView description={description} />}
                    {data.main && (
                        <>
                            <TemperatureView data={data.main} />
                            <WeatherCards data={data.main} wind={data.wind} visibility={data.visibility} />
                        </>
                    )}
                </>
            )}
        </ScrollView>
    );
});

export default CityView;
