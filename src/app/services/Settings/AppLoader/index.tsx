import { useCallback, useState } from "react";
import Constants from "expo-constants";
import { PersistGate } from "redux-persist/integration/react";
import AnimatedSplashScreen from "./AnimatedSplashScreen";
import useInitSettingsStore from "../hooks";
import ReduxPersistReadyListener from "./ReduxPersistReady";
import { persistor } from "@app/redux";

export const AppLoader = ({ children }) => {
    // const [asset, setAsset] = useState<null | Asset>(null);
    const [isReduxReady, setIsReduxReady] = useState(false);
    const { isReady: isSettingsReady } = useInitSettingsStore();

    const onReduxReady = useCallback(() => setIsReduxReady(true), []);

    console.log({
        isReduxReady,
        isSettingsReady,
        imgUrl: Constants.expoConfig.splash.image,
    });

    return (
        <>
            <AnimatedSplashScreen img={null} isReady={isReduxReady && isSettingsReady}>
                {children}
            </AnimatedSplashScreen>
            <PersistGate persistor={persistor}>
                <ReduxPersistReadyListener onReady={onReduxReady} />
            </PersistGate>
        </>
    );
};

export default AppLoader;
