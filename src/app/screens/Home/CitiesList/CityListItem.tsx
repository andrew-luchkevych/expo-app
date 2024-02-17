import { Box, HStack, VStack, Text } from "@gluestack-ui/themed";
import { CityEntity } from "@app/redux/entities/Cities/types";

export interface CityListItemProps {
    city: CityEntity;
}

export const CityListItem = (props: CityListItemProps) => {
    const { city: c } = props;
    return (
        <Box
            borderBottomWidth="$1"
            borderColor="$trueGray800"
            $dark-borderColor="$trueGray100"
            $base-pl={0}
            $base-pr={0}
            $sm-pl="$4"
            $sm-pr="$5"
            py="$2"
        >
            <HStack space="md" justifyContent="space-between">
                <VStack>
                    <Text color="$coolGray800" fontWeight="$bold" $dark-color="$warmGray100">
                        {c.name}
                    </Text>
                    <Text color="$coolGray600" $dark-color="$warmGray200">
                        {[c.state, c.country].filter((i) => i).join(", ")}
                    </Text>
                </VStack>
            </HStack>
        </Box>
    );
};

export default CityListItem;
