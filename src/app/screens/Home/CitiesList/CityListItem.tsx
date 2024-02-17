import { Box, HStack, VStack, Text, View, Heading, Spinner } from "@gluestack-ui/themed";
import { CityEntity } from "@app/redux/entities/Cities/types";
import { memo, useCallback } from "react";
import useWeather from "../../../components/CityView/useWeather";
import WeatherIcon from "@app/components/WeatherIcon";
import { useUnits } from "@app/services/Settings/store";
import { getTemperatureSign } from "@app/utils/temperature";
import { useNavigation } from "@react-navigation/native";
import routes from "@app/routes";
import { TouchableOpacity } from "react-native";

export interface CityListItemProps {
    city: CityEntity;
}

export const CityListItem = memo((props: CityListItemProps) => {
    const { city: c } = props;
    const { data, isLoading } = useWeather(c);
    const navigation = useNavigation();
    const description = data?.weather?.[0]?.description || null;
    const units = useUnits();
    const tSign = getTemperatureSign(units);

    const onPress = useCallback(() => {
        navigation.navigate(routes.city, { city: c });
    }, [navigation, c]);
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
            <TouchableOpacity onPress={onPress}>
                <HStack space="md" alignItems="center" justifyContent="space-between">
                    <View width={100} height={60}>
                        {description && (
                            <WeatherIcon
                                condition={description}
                                style={{ width: 100, height: 60 }}
                                resizeMode="contain"
                            />
                        )}
                    </View>
                    <VStack flex={1}>
                        <Text color="$coolGray800" fontWeight="$bold" $dark-color="$warmGray100">
                            {c.name}
                        </Text>
                        <Text color="$coolGray600" $dark-color="$warmGray200">
                            {[c.state, c.country].filter((i) => i).join(", ")}
                        </Text>
                    </VStack>
                    <View width={100}>
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            data.main && (
                                <Heading size="2xl" textAlign="center">
                                    {Math.round(data.main.temp)}
                                    {tSign}
                                </Heading>
                            )
                        )}
                    </View>
                </HStack>
            </TouchableOpacity>
        </Box>
    );
});

export default CityListItem;
