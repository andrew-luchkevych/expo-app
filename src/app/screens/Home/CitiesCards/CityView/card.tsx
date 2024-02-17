import { Box, Heading } from "@gluestack-ui/themed";
import { useWindowWidth } from "../../../../components/DimensionsProvider/store";

export interface CardProps {
    title: string;
    value: string;
}

export const Card = (props: CardProps) => {
    const width = useWindowWidth();
    console.log("width", width / 2 - 16);
    const boxWidth = Math.min(width / 2 - 16, 200);

    return (
        <Box pr="$2" pb="$2" width={boxWidth}>
            <Box
                flex={1}
                p="$3"
                style={{ borderRadius: 12, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                justifyContent="space-between"
            >
                <Heading size="md" pb="$2" color="$textDark400" textTransform="uppercase">
                    {props.title}
                </Heading>
                <Heading size="2xl">{props.value}</Heading>
            </Box>
        </Box>
    );
};

export default Card;
