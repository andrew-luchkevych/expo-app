import { useCallback, useState } from "react";
import { Input, InputField, Text, View, Spinner, Button, ButtonText } from "@gluestack-ui/themed";
import debounce from "lodash/debounce";
import CitiesApi, { keyExtractor } from "@app/redux/entities/Cities";
import CityListItem from "./CityListItem";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { SettingsStore } from "@app/services/Settings/store";
import { CityEntity } from "@app/redux/entities/Cities/types";

const skipChars = 3;

export const AddCityModal = () => {
    const navigation = useNavigation();
    const height = useHeaderHeight();
    const [v, setV] = useState("");
    const [search, setSearch] = useState("");
    const [city, setCity] = useState<null | CityEntity>(null);

    const { data, isLoading } = CitiesApi.useFindCityQuery(
        {
            query: search,
        },
        { skip: search.length < skipChars },
    );

    const debouncedSetSearch = useCallback(
        debounce((s: string) => setSearch(s), 500),
        [],
    );
    const onChange = useCallback((value: string) => {
        setV(value);
        debouncedSetSearch(value);
    }, []);

    const onCancel = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const onAdd = useCallback(() => {
        console.log(city);
        if (city) {
            navigation.goBack();
            SettingsStore.setValue("cities", [...SettingsStore.getState().cities, city]);
        }
    }, [navigation, city]);

    const currentCityKey = city ? keyExtractor(city) : "";
    const addDisabled = !(city && data?.find?.((c) => keyExtractor(c) === currentCityKey));

    const loading = isLoading || v !== search;
    return (
        <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1 }}
            keyboardVerticalOffset={height + Platform.OS === "ios" ? 72 : 0}
            enabled
        >
            <View flex={1} p="$4" pb="$6">
                <Input variant="rounded" mb="$4">
                    <InputField value={v} placeholder="Start typing..." onChangeText={onChange} p="$2" />
                </Input>
                <View flex={1}>
                    {v.length < skipChars ? (
                        <Text>Please type at least {skipChars} characters to start searching</Text>
                    ) : null}

                    {v.length >= skipChars && data?.length ? (
                        <FlatList<(typeof data)[0]>
                            data={data}
                            renderItem={({ item }) => (
                                <CityListItem
                                    city={item}
                                    isSelected={item.lat === city?.lat && item.lon === city.lon}
                                    onSelect={setCity}
                                />
                            )}
                            keyExtractor={keyExtractor}
                        />
                    ) : null}

                    {loading && <Spinner size="large" />}

                    {v.length >= skipChars && !loading && !data?.length ? <Text>Not found.</Text> : null}
                </View>
                <View flexDirection="row" justifyContent="space-between">
                    <Button variant="outline" onPress={onCancel}>
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button isDisabled={addDisabled} onPress={onAdd}>
                        <ButtonText>Add</ButtonText>
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default AddCityModal;
