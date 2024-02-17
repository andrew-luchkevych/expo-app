import CitiesApi from "./enhancer";
import { CityEntity } from "./types";

export const keyExtractor = (item: CityEntity) => `${item.name}_${item.lat}_${item.lon}`;
export default CitiesApi;
