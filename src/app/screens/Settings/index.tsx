import { View, Heading, Button, ButtonText, HStack } from "@gluestack-ui/themed";
import UnitsSwitcher from "./units";
import { useCities, useIsConnected } from "@app/services/Settings/store";
import CitiesList from "./Cities";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import routes from "@app/routes";

export const Settings = () => {
    const navigation = useNavigation();
    const isConnected = useIsConnected();
    const cities = useCities();
    const addCity = useCallback(() => {
        navigation.navigate(routes.addCity);
    }, [navigation]);
    return (
        <View flex={1} p="$4">
            <Heading size="2xl" pb="$4">
                Units
            </Heading>
            <UnitsSwitcher />
            {!!cities.length && (
                <>
                    <HStack justifyContent="space-between" pb="$5" pt="$10">
                        <Heading size="2xl">Cities</Heading>
                        <Button onPress={addCity} disabled={!isConnected}>
                            <ButtonText>Add</ButtonText>
                        </Button>
                    </HStack>
                    <CitiesList />
                </>
            )}
        </View>
    );
};

export default Settings;
