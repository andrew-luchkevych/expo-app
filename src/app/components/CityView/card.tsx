import { Box, Heading } from "@gluestack-ui/themed";
import { useWindowWidth } from "../DimensionsProvider/store";
import { StyleProp, ViewStyle } from "react-native";
import { ReactNode } from "react";
export interface CardProps {
    title?: string;
    value?: string;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
    disableBg?: boolean;
}

export const Card = (props: CardProps) => {
    const { title, value, style, disableBg, children } = props;

    const width = useWindowWidth();
    const boxWidth = Math.min(width / 2 - 16, 200);

    return (
        <Box pr="$2" pb="$2" width={boxWidth} style={style}>
            <Box
                flex={1}
                p="$3"
                style={{ borderRadius: 12, backgroundColor: disableBg ? "transparent" : "rgba(255, 255, 255, 0.3)" }}
                justifyContent="space-between"
            >
                {title && (
                    <Heading size="md" pb="$2" color="$textDark400" textTransform="uppercase">
                        {title}
                    </Heading>
                )}
                {children || <Heading size="2xl">{value}</Heading>}
            </Box>
        </Box>
    );
};

export default Card;
