import { View } from "@gluestack-ui/themed";
import { FlatList, Animated, FlatListProps } from "react-native";
import Indicators from "./indicators";
import { useCallback, useRef } from "react";
import { CityEntity } from "@app/redux/entities/Cities/types";
import { keyExtractor } from "@app/redux/entities/Cities";
import { CitiesStore } from "./store";
import CityView from "@app/components/CityView";
import Footer from "../Footer";
import { useCities } from "@app/services/Settings/store";

type ListProps = FlatListProps<CityEntity>;
export const CitiesCards = () => {
    const cities = useCities();
    const scrollX = useRef(new Animated.Value(0)).current;
    const renderItem: ListProps["renderItem"] = useCallback(({ item }) => <CityView city={item} />, []);
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems?.[0]) CitiesStore.setValue("activeCityKey", keyExtractor(viewableItems[0]));
    }).current;
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const onScroll = useCallback((event) => {
        Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })(event);
    }, []);

    return (
        <View flex={1}>
            <View flex={1}>
                <FlatList<CityEntity>
                    horizontal
                    data={cities}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    pagingEnabled
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                />
            </View>
            <Footer>
                <Indicators scrollX={scrollX} />
            </Footer>
        </View>
    );
};

export default CitiesCards;
