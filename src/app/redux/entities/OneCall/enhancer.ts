import InjectedOneCallApi from "./injector";
import { OneCallRequestArgs } from "./types";

export const type = "OneCall";

const getOneCallId = (args: OneCallRequestArgs) => {
    return `${args.lat}${args.lon}_${args.units}`;
};

export const OneCallApi = InjectedOneCallApi.enhanceEndpoints({
    addTagTypes: [type],
    endpoints: {
        oneCall: {
            providesTags: (response, error, args) => [{ type, id: getOneCallId(args) }],
        },
    },
});

export default OneCallApi;
