import { Button, View, ButtonText, Heading } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import routes from "@app/routes";

export const NoData = () => {
    const navigation = useNavigation();
    const showAddCity = useCallback(() => {
        navigation.navigate(routes.addCity);
    }, [navigation]);

    return (
        <View flex={1} p="$6" alignItems="center" justifyContent="center">
            <Heading mb="$4" textAlign="center">
                Looks like you have not added your cities yet.
            </Heading>
            <Button onPress={showAddCity}>
                <ButtonText>Add a new city</ButtonText>
            </Button>
        </View>
    );
};

export default NoData;
