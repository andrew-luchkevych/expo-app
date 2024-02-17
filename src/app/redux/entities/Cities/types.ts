export interface CityEntity {
    name: string;
    state: string;
    country: string;
    lat: number;
    lon: number;
}

export interface FindCityArgs {
    query: string;
    limit?: number;
}
export type FindCityResponse = CityEntity[];
