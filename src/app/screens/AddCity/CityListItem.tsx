import { Box, HStack, VStack, Text, Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon } from "@gluestack-ui/themed";
import { useCallback, useRef } from "react";
import { CityEntity } from "@app/redux/entities/Cities/types";
import { TouchableOpacity } from "react-native";

export interface CityListItemProps {
    city: CityEntity;
    isSelected: boolean;
    onSelect: (city: null | CityEntity) => void;
}

export const CityListItem = (props: CityListItemProps) => {
    const { city: c, isSelected, onSelect } = props;
    const isSelectedRef = useRef(isSelected);
    isSelectedRef.current = isSelected;
    const toggle = useCallback(() => {
        onSelect(isSelectedRef.current ? null : c);
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
            <TouchableOpacity onPress={toggle}>
                <HStack space="md" justifyContent="space-between">
                    <VStack>
                        <Text color="$coolGray800" fontWeight="$bold" $dark-color="$warmGray100">
                            {c.name}
                        </Text>
                        <Text color="$coolGray600" $dark-color="$warmGray200">
                            {[c.state, c.country].filter((i) => i).join(", ")}
                        </Text>
                    </VStack>
                    <Checkbox
                        pointerEvents="none"
                        value={isSelected.toString()}
                        size="md"
                        isChecked={isSelected}
                        aria-label={c.name}
                    >
                        <CheckboxIndicator mr="$2">
                            <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                    </Checkbox>
                </HStack>
            </TouchableOpacity>
        </Box>
    );
};

export default CityListItem;
