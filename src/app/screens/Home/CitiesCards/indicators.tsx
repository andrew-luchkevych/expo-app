import { useCities } from "@app/services/Settings/store";
import { Animated, View } from "react-native";
import { useWindowWidth } from "@app/components/DimensionsProvider/store";

export interface IndicatorsProps {
    scrollX: Animated.Value;
}
export const Indicators = (props: IndicatorsProps) => {
    const { scrollX } = props;
    const cities = useCities();
    const width = useWindowWidth();
    return (
        <View
            style={{
                position: "absolute",
                bottom: -8,
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {cities.map((city, idx) => {
                const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [12, 30, 12],
                    extrapolate: "clamp",
                });

                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ["#ccc", "#fff", "#ccc"],
                    extrapolate: "clamp",
                });

                return (
                    <Animated.View
                        key={idx.toString()}
                        style={{ width: dotWidth, height: 12, borderRadius: 6, marginHorizontal: 3, backgroundColor }}
                    />
                );
            })}
        </View>
    );
};

export default Indicators;
