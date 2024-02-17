import InjectedCitiesApi from "./injector";

export const foundCitiesListType = "FoundCities";

export const CitiesApi = InjectedCitiesApi.enhanceEndpoints({
    addTagTypes: [foundCitiesListType],
    endpoints: {
        findCity: {
            providesTags: (response, error, args) => [{ type: foundCitiesListType, id: args.query }],
        },
    },
});

export default CitiesApi;
