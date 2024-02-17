import createStore from "@app/utils/store";

export interface CitiesStoreProps {
    activeCityKey: string;
    scrollX: number;
}

export const CitiesStore = createStore<CitiesStoreProps>({
    activeCityKey: "",
    scrollX: 0,
});

export const useCitiesStore = CitiesStore.useStore;

const activeCityKeySelector = ({ activeCityKey }: CitiesStoreProps) => activeCityKey;
export const useActiveCityKey = () => useCitiesStore(activeCityKeySelector);
