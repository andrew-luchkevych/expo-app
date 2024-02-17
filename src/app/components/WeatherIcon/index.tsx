import { WeatherConditions } from "@app/redux/entities/Weather/types";
import { memo } from "react";
import { Image, ImageProps } from "react-native";

export interface WeatherIconProps extends Omit<ImageProps, "source"> {
    condition: WeatherConditions;
}

const getIconSource = (condition: WeatherConditions) => {
    const hours = new Date().getHours();
    if (condition === WeatherConditions.clearSky) {
        return hours >= 20 ? require("@assets/weather/moon.png") : require("@assets/weather/sunny.png");
    }

    if (condition === WeatherConditions.fewClouds) {
        return hours >= 20 ? require("@assets/weather/moon-cloudy.png") : require("@assets/weather/sun-cloudy.png");
    }

    switch (condition) {
        case WeatherConditions.scatteredClouds:
        case WeatherConditions.brokenClouds:
            return require("@assets/weather/cloud.png");
        case WeatherConditions.rain:
            return require("@assets/weather/heavy-rain.png");
        case WeatherConditions.showerRain:
            return require("@assets/weather/shower-rain.png");
        case WeatherConditions.thunderstorm:
            return require("@assets/weather/thunderstorm.png");
        case WeatherConditions.snow:
            return require("@assets/weather/snow.png");
        case WeatherConditions.mist:
            return require("@assets/weather/mist.png");
        default:
            if ((condition as string).includes("cloud")) return require("@assets/weather/cloud.png");
    }
};

export const WeatherIcon = memo((props: WeatherIconProps) => {
    const { condition, ...rest } = props;
    const src = getIconSource(condition);
    return <Image {...rest} source={src || ""} />;
});

export default WeatherIcon;
