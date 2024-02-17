import { SafeAreaView, View } from "@gluestack-ui/themed";
import { useCities } from "@app/services/Settings/store";
import Cities from "./cities";
import NoData from "./NoData";

export const Home = () => {
    const { length } = useCities();
    return (
        <View flex={1}>
            <SafeAreaView flex={1}>{length ? <Cities /> : <NoData />}</SafeAreaView>
        </View>
    );
};

export default Home;
