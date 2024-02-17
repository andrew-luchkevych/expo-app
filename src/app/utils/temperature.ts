import { UNITS } from "@app/redux/entities/Weather/types";

export const getTemperatureSign = (units: UNITS) => {
    switch (units) {
        case UNITS.standard:
            return "K";
        case UNITS.metric:
            return "°C";
        case UNITS.imperial:
            return "°F";
    }
};
