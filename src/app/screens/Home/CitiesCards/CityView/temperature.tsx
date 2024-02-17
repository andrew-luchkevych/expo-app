import { ComponentProps } from "react";
import { Heading, View, Text } from "@gluestack-ui/themed";
import { Weather } from "@app/redux/entities/Weather/types";
import { useUnits } from "@app/services/Settings/store";
import { getTemperatureSign } from "@app/utils/temperature";

export interface TemperatureViewProps extends Omit<ComponentProps<typeof View>, "children"> {
    data: Weather["main"];
}

export const TemperatureView = (props: TemperatureViewProps) => {
    const { data, ...rest } = props;
    const units = useUnits();
    const tSign = getTemperatureSign(units);
    return (
        <View {...rest}>
            <Heading textAlign="center" size="4xl" pb="$1">
                {Math.round(data.temp)}
                {tSign}
            </Heading>

            {data.temp_min === data.temp_max ? null : (
                <Text textAlign="center">
                    {`Min: ${Math.round(data.temp_min)}${tSign} | Max: ${Math.round(data.temp_max)}${tSign}`}
                </Text>
            )}
            <Text textAlign="center">{`Feels like ${Math.round(data.feels_like)}${tSign}`}</Text>
        </View>
    );
};

export default TemperatureView;
