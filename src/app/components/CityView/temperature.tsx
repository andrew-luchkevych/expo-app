import { ComponentProps } from "react";
import { Heading, View, Text } from "@gluestack-ui/themed";
import { useUnits } from "@app/services/Settings/store";
import { getTemperatureSign } from "@app/utils/temperature";

export interface TemperatureViewProps extends Omit<ComponentProps<typeof View>, "children"> {
    min: number;
    max: number;
    temp: number;
    feelsLike: number;
}

export const TemperatureView = (props: TemperatureViewProps) => {
    const { min, max, temp, feelsLike, ...rest } = props;
    const units = useUnits();
    const tSign = getTemperatureSign(units);
    return (
        <View {...rest}>
            <Heading textAlign="center" size="4xl" pb="$1">
                {Math.round(temp)}
                {tSign}
            </Heading>

            {min === max ? null : (
                <Text textAlign="center">{`Min: ${Math.round(min)}${tSign} | Max: ${Math.round(max)}${tSign}`}</Text>
            )}
            <Text textAlign="center">{`Feels like ${Math.round(feelsLike)}${tSign}`}</Text>
        </View>
    );
};

export default TemperatureView;
