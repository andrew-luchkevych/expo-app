import { getFixedTimestamp } from "@app/utils/timestamp";
import moment from "moment";

export type SetsData = {
    moonset: number;
    sunset: number;
};

export enum WeatherConditions {
    thunderstorm = "Thunderstorm",
    drizzle = "Drizzle",
    rain = "Rain",
    snow = "Snow",
    atmosphere = "Atmosphere",
    clear = "Clear",
    clouds = "Clouds",
}

export const getWeatherConditionsByCode = (code: number) => {
    if (code === 800) return WeatherConditions.clear;

    const n = Number(code.toString()[0] || "0");
    switch (n) {
        case 2:
            return WeatherConditions.thunderstorm;
        case 3:
            return WeatherConditions.drizzle;
        case 5:
            return WeatherConditions.rain;
        case 6:
            return WeatherConditions.snow;
        case 7:
            return WeatherConditions.atmosphere;
        case 8:
            return WeatherConditions.clouds;
        default:
            return WeatherConditions.clear;
    }
};

export const getIconMode = (sets?: SetsData): "day" | "night" => {
    const now = moment();
    if (!(sets?.sunset && sets?.moonset)) {
        const hrs = now.hours();
        return hrs > 6 && hrs < 18 ? "day" : "night";
    }

    if (now.isSameOrAfter(getFixedTimestamp(sets.moonset))) return "day";
    if (now.isSameOrAfter(getFixedTimestamp(sets.sunset))) return "night";

    return "day";
};

export const getIconSource = (code: number, description: string, sets?: SetsData) => {
    const cond = getWeatherConditionsByCode(code);

    if (cond === WeatherConditions.clear) {
        return getIconMode(sets) === "day" ? require("@assets/weather/sunny.png") : require("@assets/weather/moon.png");
    }

    if (cond === WeatherConditions.clouds && description.toLowerCase() === "few clouds") {
        return getIconMode(sets) === "day"
            ? require("@assets/weather/sun-cloudy.png")
            : require("@assets/weather/moon-cloudy.png");
    }

    switch (cond) {
        case WeatherConditions.thunderstorm:
            return require("@assets/weather/thunderstorm.png");
        case WeatherConditions.clouds:
            return require("@assets/weather/cloud.png");
        case WeatherConditions.drizzle:
            return require("@assets/weather/wet.png");
        case WeatherConditions.rain:
            return require("@assets/weather/heavy-rain.png");
        case WeatherConditions.snow:
            return require("@assets/weather/snow.png");
        case WeatherConditions.atmosphere:
            return require("@assets/weather/mist.png");
        default:
            return require("@assets/weather/partly-cloudy.png");
    }
};
