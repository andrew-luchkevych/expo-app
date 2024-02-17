import createStore from "@app/utils/store";

export enum ViewMode {
    list = "list",
    cards = "cards",
}

export interface HomeStoreProps {
    mode: ViewMode;
}

export const HomeStore = createStore<HomeStoreProps>({
    mode: ViewMode.cards,
});

export const useHomeStore = HomeStore.useStore;

const modeSelector = ({ mode }: HomeStoreProps) => mode;
export const useViewMode = () => useHomeStore(modeSelector);
