import { Heading, View } from "@gluestack-ui/themed";
import WeatherIcon from "../WeatherIcon";
import { Weather } from "@app/redux/entities/Weather/types";
import { ComponentProps } from "react";

export interface WeatherViewProps extends Omit<ComponentProps<typeof View>, "children"> {
    description: Weather["weather"][0]["description"];
}

export const WeatherView = (props: WeatherViewProps) => {
    const { description, ...rest } = props;
    return (
        <View {...rest}>
            <Heading textAlign="center" size="lg" pb="$2">
                {description}
            </Heading>
            <View alignItems="center">
                <WeatherIcon condition={description} />
            </View>
        </View>
    );
};

export default WeatherView;
