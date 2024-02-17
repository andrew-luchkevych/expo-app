export interface MainWeather {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

export enum WeatherConditions {
    clearSky = "clear sky",
    fewClouds = "few clouds",
    scatteredClouds = "scattered clouds",
    brokenClouds = "broken clouds",
    showerRain = "shower rain",
    rain = "rain",
    thunderstorm = "thunderstorm",
    snow = "snow",
    mist = "mist",
}

export interface WeatherBase {
    id: number;
    main: string;
    description: WeatherConditions;
    icon: string;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface Clouds {
    all: number;
}

export interface Sys {
    country: string;
    sunrise: number;
    sunset: number;
}

export interface Rain {
    "1h": number;
}
export interface Weather {
    coord: { lon: number; lat: number };
    weather: WeatherBase[];
    base: string;
    main: MainWeather;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    rain?: Rain;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export enum UNITS {
    standard = "standard",
    metric = "metric",
    imperial = "imperial",
}

export type GetWeatherRequestArgs = {
    lat: number;
    lon: number;
    exclude: "minutely";
    units: UNITS;
};

export type GetWeatherResponseType = Weather;
