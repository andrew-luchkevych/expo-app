import CitiesCards from "./CitiesCards";
import CitiesList from "./CitiesList";
import { ViewMode, useViewMode } from "./store";

export const Cities = () => {
    const mode = useViewMode();
    return mode === ViewMode.cards ? <CitiesCards /> : <CitiesList />;
};

export default Cities;
