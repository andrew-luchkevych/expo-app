import { CityEntity } from "@app/redux/entities/Cities/types";
import { useCities } from "@app/services/Settings/store";
import { useCallback, useMemo, useState } from "react";
import { FlatList, FlatListProps, KeyboardAvoidingView } from "react-native";
import CityListItem from "./CityListItem";
import { keyExtractor } from "@app/redux/entities/Cities";
import { View, Text } from "@gluestack-ui/themed";
import { useHeaderHeight } from "@react-navigation/elements";
import Footer from "../Footer";
import ClearableInput from "@app/components/ClearableInput";

type ListProps = FlatListProps<CityEntity>;
export const CitiesList = () => {
    const cities = useCities();
    const height = useHeaderHeight();
    const [v, setV] = useState("");
    const renderItem: ListProps["renderItem"] = useCallback(({ item }) => <CityListItem city={item} />, []);
    const filtered = useMemo(() => {
        if (!v.length) return cities;
        const search = v.toLowerCase();
        return cities.filter((c) => c.name.toLowerCase().includes(search));
    }, [v, cities]);

    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} enabled>
            <View flex={1} p="$4">
                <ClearableInput value={v} onChangeText={setV} placeholder="Start typing..." />
                <View flex={1} pt="$4" pb="$2">
                    {filtered.length ? (
                        <FlatList<CityEntity> data={filtered} renderItem={renderItem} keyExtractor={keyExtractor} />
                    ) : (
                        <Text>No cities matched your criteria.</Text>
                    )}
                </View>
            </View>
            <Footer />
        </KeyboardAvoidingView>
    );
};

export default CitiesList;
