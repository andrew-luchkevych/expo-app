import { memo } from "react";
import { Image, ImageProps } from "react-native";
import { SetsData, getIconSource } from "./helpers";

export interface WeatherIconOwnProps {
    code: number;
    description: string;
    sets?: SetsData;
}
export type WeatherIconProps = Omit<ImageProps, "source"> & WeatherIconOwnProps;

export const WeatherIcon = memo((props: WeatherIconProps) => {
    const { code, description, sets, ...rest } = props;
    const src = getIconSource(code, description, sets);
    return <Image {...rest} source={src || ""} />;
});

export default WeatherIcon;
