import createStore from "@app/utils/store";
import { Dimensions } from "react-native";

export type DimensionsStoreProps = ReturnType<typeof Dimensions.get>;

export const DimensionsStore = createStore<DimensionsStoreProps>({
    ...Dimensions.get("window"),
});

export const useDimensionsStore = DimensionsStore.useStore;

const widthSelector = ({ width }: DimensionsStoreProps) => width;
export const useWindowWidth = () => useDimensionsStore(widthSelector);

const heightSelector = ({ height }: DimensionsStoreProps) => height;
export const useWindowHeight = () => useDimensionsStore(heightSelector);
