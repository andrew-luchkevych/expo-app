import { Heading, ScrollView, Spinner, View, Text, LinearGradient, Button, ButtonText } from "@gluestack-ui/themed";
import { useWindowWidth } from "../DimensionsProvider/store";
import { memo, useCallback } from "react";
import { CityEntity } from "@app/redux/entities/Cities/types";
import useWeather from "../../hooks/useWeather";
import WeatherView from "./weather";
import TemperatureView from "./temperature";
import WeatherCards from "./cards";
import useTodayDailyData from "@app/hooks/useTodayDailyData";
import useTodaySets from "@app/hooks/useTodaySets";
import DailyData from "./DailyData";
import HourlyView from "./HourlyView";
import { useNavigation } from "@react-navigation/native";
import routes from "@app/routes";

const emptyDailyData: ReturnType<typeof useWeather>["data"]["daily"] = [];
export interface CityViewProps {
    city: CityEntity;
    mode: "full" | "partial";
}

export const CityView = memo((props: CityViewProps) => {
    const { city, mode = "partial" } = props;
    const navigation = useNavigation();
    const width = useWindowWidth();
    const { data, isLoading, isError } = useWeather(city);
    const todayData = useTodayDailyData(data?.daily || null);
    const todaySets = useTodaySets(data?.daily || null);
    const currentData = data?.current || null;
    const weather = currentData?.weather?.[0] || null;
    const onDetailsPress = useCallback(() => {
        navigation.navigate(routes.city, { city });
    }, [navigation, city]);
    return (
        <View flex={1} width={width} overflow="hidden">
            <Heading size="2xl" textAlign="center" pb="$2">
                {city.name}
            </Heading>
            <View flex={1}>
                <ScrollView flex={1} p="$4" pb="$8">
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
                            {weather && (
                                <WeatherView code={weather.id} description={weather.description} sets={todaySets} />
                            )}
                            {currentData && todayData && (
                                <TemperatureView
                                    temp={currentData.temp}
                                    min={todayData.temp.min}
                                    max={todayData.temp.max}
                                    feelsLike={currentData.feels_like}
                                />
                            )}
                            {!!data?.hourly?.length && <HourlyView data={data.hourly} />}
                            {mode === "full" && !!data?.daily?.length && <DailyData dailyData={data.daily} />}
                            <WeatherCards data={currentData} mode={mode} />
                            {mode === "partial" && (
                                <Button variant="link" size="xl" onPress={onDetailsPress}>
                                    <ButtonText>View more</ButtonText>
                                </Button>
                            )}
                        </>
                    )}
                </ScrollView>
            </View>
        </View>
    );
});

export default CityView;
