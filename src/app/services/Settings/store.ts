import createStore from "@app/utils/store";
import { CityEntity } from "@app/redux/entities/Cities/types";
import { UNITS } from "@app/redux/entities/Weather/types";

export interface SettingsStoreProps {
    units: UNITS;
    cities: CityEntity[];
}

export const settingsStoreInitialValue: SettingsStoreProps = {
    units: UNITS.metric,
    cities: [],
};

export const SettingsStore = createStore<SettingsStoreProps>(settingsStoreInitialValue);

export const useSettingsStore = SettingsStore.useStore;

const unitsSelector = ({ units }: SettingsStoreProps) => units;
export const useUnits = () => useSettingsStore(unitsSelector);

const citiesSelector = ({ cities }: SettingsStoreProps) => cities;
export const useCities = () => useSettingsStore(citiesSelector);
