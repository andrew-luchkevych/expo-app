import { useCallback, useEffect, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import NetInfo from "@react-native-community/netinfo";
import AnimatedSplashScreen from "./AnimatedSplashScreen";
import useInitSettingsStore from "../hooks";
import ReduxPersistReadyListener from "./ReduxPersistReady";
import { persistor } from "@app/redux";
import { SettingsStore } from "../store";

export const AppLoader = ({ children }) => {
    const [isReduxReady, setIsReduxReady] = useState(false);
    const { isReady: isSettingsReady } = useInitSettingsStore();
    const onReduxReady = useCallback(() => setIsReduxReady(true), []);

    useEffect(() => {
        const abort = new AbortController();
        let unsubscribe = () => null;
        (async () => {
            await NetInfo.fetch();
            if (!abort.signal.aborted) {
                unsubscribe = NetInfo.addEventListener(({ isConnected, isInternetReachable }) => {
                    const res = isConnected && isInternetReachable;
                    if (SettingsStore.getState().isConnected !== res) {
                        SettingsStore.setValue("isConnected", res);
                    }
                });
            }
        })();

        return () => {
            abort.abort();
            unsubscribe();
        };
    }, []);

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
