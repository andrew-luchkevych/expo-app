import { Box, HStack, VStack, Text, Button, ButtonIcon, TrashIcon } from "@gluestack-ui/themed";
import { useCallback } from "react";
import { CityEntity } from "@app/redux/entities/Cities/types";
import { SettingsStore } from "@app/services/Settings/store";
import { keyExtractor } from "@app/redux/entities/Cities";

export interface CityListItemProps {
    city: CityEntity;
}

export const CityListItem = (props: CityListItemProps) => {
    const { city: c } = props;
    const onDelete = useCallback(() => {
        const arr = [...SettingsStore.getState().cities];
        const key = keyExtractor(c);
        const index = arr.findIndex((i) => keyExtractor(i) === key);
        arr.splice(index, 1);
        SettingsStore.setValue("cities", arr);
    }, [c]);
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
                <Button
                    action="negative"
                    borderRadius="$full"
                    size="lg"
                    p="$3.5"
                    bg="$indigo600"
                    borderColor="$indigo600"
                    onPress={onDelete}
                >
                    <ButtonIcon as={TrashIcon} />
                </Button>
            </HStack>
        </Box>
    );
};

export default CityListItem;
