import { useUnits } from "@app/services/Settings/store";
import { getTemperatureSign } from "@app/utils/temperature";
import { HStack, LinearGradient, Text, View, Box } from "@gluestack-ui/themed";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { useState } from "react";

export interface TempViewProps {
    minTemp: number;
    maxTemp: number;
    minRangeTemp: number;
    maxRangeTemp: number;
}

export const TempView = (props: TempViewProps) => {
    const { minTemp, maxTemp, minRangeTemp, maxRangeTemp } = props;
    const units = useUnits();
    const [width, setWidth] = useState(0);
    const rangeDiff = Math.abs(maxRangeTemp - minRangeTemp);
    const step = width / rangeDiff;
    const pStart = Math.abs(minTemp - minRangeTemp) * step;
    const tempWidth = Math.abs(maxTemp - minTemp) * step;
    return (
        <HStack space="md" alignItems="center">
            <Box width={50}>
                <Text textAlign="right">{`${Math.round(minTemp)} ${getTemperatureSign(units)}`}</Text>
            </Box>
            <View
                flex={1}
                onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
                height={10}
                borderRadius="$sm"
                bg="$backgroundDark900"
                style={{ paddingLeft: pStart }}
            >
                <View overflow="hidden" borderRadius="$sm" height={10} width={tempWidth}>
                    <LinearGradient
                        position="absolute"
                        left={-pStart}
                        width={width}
                        borderRadius="$sm"
                        height={10}
                        colors={["#26BAFF", "#FADD1E"]}
                        start={[0, 1]}
                        end={[1, 0]}
                        as={ExpoLinearGradient}
                    />
                </View>
            </View>
            <Box width={50}>
                <Text textAlign="right">{`${Math.round(maxTemp)} ${getTemperatureSign(units)}`}</Text>
            </Box>
        </HStack>
    );
};

export default TempView;
