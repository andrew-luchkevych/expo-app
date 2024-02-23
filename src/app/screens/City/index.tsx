import CityView from "@app/components/CityView";
import { CityEntity } from "@app/redux/entities/Cities/types";
import { SafeAreaView, Text, View } from "@gluestack-ui/themed";

export interface CityProps {
    route?: {
        params?: {
            city?: CityEntity;
        };
    };
}
export const City = (props: CityProps) => {
    const city = props.route?.params?.city || null;
    return (
        <SafeAreaView flex={1}>
            {city ? <CityView city={city} mode="full" /> : <Text p="$4">Looks like something went wrong.</Text>}
        </SafeAreaView>
    );
};

export default City;
