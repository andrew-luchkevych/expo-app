import { CityEntity } from "@app/redux/entities/Cities/types";
import { useCities } from "@app/services/Settings/store";
import { useCallback } from "react";
import { FlatList, FlatListProps } from "react-native";
import { keyExtractor } from "@app/redux/entities/Cities";
import CityListItem from "./CityListItem";

type ListProps = FlatListProps<CityEntity>;

export const CitiesList = () => {
    const cities = useCities();
    const renderItem: ListProps["renderItem"] = useCallback(({ item }) => <CityListItem city={item} />, []);

    return !cities.length ? null : (
        <FlatList<CityEntity> data={cities} renderItem={renderItem} keyExtractor={keyExtractor} />
    );
};

export default CitiesList;
