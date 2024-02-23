export enum UNITS {
    standard = "standard",
    metric = "metric",
    imperial = "imperial",
}

export type WeatherBase = {
    id: number;
    main: string;
    description: string;
    icon: string;
};

export type OneCallWeatherBase = {
    dt: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: [WeatherBase];
    pop: number;
};

export type OneCallSunData = {
    sunrise: number;
    sunset: number;
};

export type OneCallMoonData = {
    moonrise: number;
    moonset: number;
};

export type OneCallHourlyTemp = {
    temp: number;
    feels_like: number;
};

export type OneCallCurrentWeather = OneCallWeatherBase & OneCallSunData & OneCallHourlyTemp;

export type OneCallDailyTempBase = {
    day: number;
    eve: number;
    morn: number;
    night: number;
};
export type OneCallDailyTemp = OneCallDailyTempBase & {
    min: number;
    max: number;
};

export type OneCallDailyWeather = OneCallWeatherBase &
    OneCallSunData &
    OneCallMoonData & {
        temp: OneCallDailyTemp;
        feels_like: OneCallDailyTempBase;
    };

export type OneCallHourlyWeather = OneCallWeatherBase & OneCallHourlyTemp;

export type OneCallResult = {
    current: OneCallCurrentWeather;
    daily: OneCallDailyWeather[];
    hourly: OneCallWeatherBase[];
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: string;
};

export type OneCallRequestArgs = {
    lat: number;
    lon: number;
    units: UNITS;
};

export type OneCallResponseType = OneCallResult;
