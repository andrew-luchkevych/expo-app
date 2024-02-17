import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as ReduxProvider } from "react-redux";
import { GluestackUIProvider, StatusBar } from "@gluestack-ui/themed";
import { navigatorTheme } from "@app/theme";
import { config as defaultThemeConfig } from "@gluestack-ui/config";
import Home from "./screens/Home";
import AppLoader from "./services/Settings/AppLoader";
import { store } from "@app/redux";
import AddCityModal from "./screens/AddCity";
import Settings from "./screens/Settings";
import routes from "./routes";

const Stack = createNativeStackNavigator();

export const App = () => {
    return (
        <GluestackUIProvider colorMode="dark" config={defaultThemeConfig}>
            <ReduxProvider store={store}>
                <AppLoader>
                    <StatusBar />
                    <NavigationContainer theme={navigatorTheme}>
                        <Stack.Navigator>
                            <Stack.Group screenOptions={{ headerShown: false }}>
                                <Stack.Screen name={routes.home} component={Home} />
                            </Stack.Group>
                            <Stack.Group screenOptions={{ presentation: "modal" }}>
                                <Stack.Screen name={routes.addCity} component={AddCityModal} />
                                <Stack.Screen name={routes.settings} component={Settings} />
                            </Stack.Group>
                        </Stack.Navigator>
                    </NavigationContainer>
                </AppLoader>
            </ReduxProvider>
        </GluestackUIProvider>
    );
};

export default App;
