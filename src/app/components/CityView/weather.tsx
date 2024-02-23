import { Heading, View } from "@gluestack-ui/themed";
import WeatherIcon, { WeatherIconOwnProps } from "../WeatherIcon";
import { ComponentProps } from "react";

export type WeatherViewProps = Omit<ComponentProps<typeof View>, "children"> & WeatherIconOwnProps;

export const WeatherView = (props: WeatherViewProps) => {
    const { code, description, sets, ...rest } = props;
    return (
        <View {...rest}>
            <Heading textAlign="center" size="lg" pb="$2">
                {description}
            </Heading>
            <View alignItems="center">
                <WeatherIcon code={code} description={description} sets={sets} />
            </View>
        </View>
    );
};

export default WeatherView;
