import Constants from "expo-constants";
import { DarkTheme } from "@react-navigation/native";

export const navigatorTheme = {
    ...DarkTheme,

    colors: {
        ...DarkTheme.colors,
        background: Constants.expoConfig.splash.backgroundColor,
        card: Constants.expoConfig.splash.backgroundColor,
    },
};
